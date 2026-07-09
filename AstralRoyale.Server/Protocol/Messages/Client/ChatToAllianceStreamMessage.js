const fs = require("fs");

const PiranhaMessage = require('../../PiranhaMessage')
const cardUtils = require('../../../Utils/cardUtils')
const utils = require('../../../Utils')
const Cards = require('../../../Utils/json/cards.json')
const ServerErrorMessage = require('../Server/ServerErrorMessage')
const AllianceStreamEntryMessage = require('../Server/AllianceStreamEntryMessage')
const SectorStateMessage = require('../Server/SectorStateMessage')

const config = require('../../../config.json')
const connectedClients = require('../../../Core/ConnectedClients')
const LogicBattle = require('../../../Core/LogicBattle')

const RarityMaxLevel = {
  common: 12, // 13
  rare: 10, // 11
  epic: 7, // 8
  legendary: 4 // 5
}

function GetCardDataByID(id) {
  const realID = 26000000 + (id - 1)
  return Cards.find(c => c.id === realID)
}

function GetMaxLevel(id) {
  const data = GetCardDataByID(id)
  if (!data) {
    return 12
  }
  return RarityMaxLevel[data.rarity.toLowerCase()] ?? 12
}

function FormatUptime(seconds) {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`)

  return parts.join(' ')
}

const AllCardIDS = Cards.map(c => c.id)

class ChatToAllianceStreamMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10554
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.StreamEntryType = 2
    this.data.Message = this.readString()

    //console.log(this.data)
  }

  async process () {
    if (!this.client.player.inClan) return

    if (this.data.Message?.startsWith('/')) {
      const args = this.data.Message.slice(1).trim().split(/\s+/)
      const command = args.shift()?.toLowerCase()
      const player = this.client.player

      switch (command) {
        // get a list of cmds
        case 'help': {
          const list = [
            'Commands:',
            '/help',
            '/switchacc x(userid) x(pass) or /switchacc reset',
            '/setpassword x',
            '/adminhelp'
          ].join('\n')

          await new ServerErrorMessage(this.client, list).send()

          break
        }

        // get a list of admin cmds
        case 'adminhelp': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            const list = [
              'Admin Commands:',
              '/adminhelp',
              '/status',
              '/maintenance x',
              '/admin x',
              '/unadmin x',
              '/ban x',
              '/unban x',
              '/max',
              '/unlock',
              '/gold x',
              '/gems x',
              '/trophies x'
            ].join('\n')

            await new ServerErrorMessage(this.client, list).send()
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        // get server status
        case 'status': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            const allplayers = this.client.mongoose?.mongoosePlayers
            const allclans = this.client.mongoose?.mongooseClans
            const [playerCount, clanCount] = await Promise.all([allplayers ? allplayers.countDocuments() : 0, allclans ? allclans.countDocuments() : 0])

            const battleCounts = {'1v1': 0, '2v2': 0, tournament: 0, friendlyClan1v1: 0}

            for (const battle of LogicBattle.activeBattles.values()) {
              if (battle?.battleType === '2v2') {
                battleCounts['2v2']++
              } else if (battle?.battleType === 'tournament') {
                battleCounts.tournament++
              } else if (battle?.battleType === 'friendlyClan1v1') {
                battleCounts.friendlyClan1v1++
              } else {
                battleCounts['1v1']++
              }
            }

            const status = [
              'Server Status:',
              `Build Version: ${require('../../../package.json').version}`,
              `Fingerprint SHA: ${config.Server.Fingerprint}`,
              `Online Players: ${connectedClients.size}`,
              `Total Players: ${playerCount}`,
              `Total Clans: ${clanCount}`,
              `1v1 Battles: ${battleCounts['1v1']}`,
              `2v2 Battles: ${battleCounts['2v2']}`,
              `Tournament Battles: ${battleCounts.tournament}`,
              `Friendly Clan 1v1 Battles: ${battleCounts.friendlyClan1v1}`,
              `Uptime: ${FormatUptime(process.uptime())}`,
              `Used RAM: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`
            ].join('\n')

            await new ServerErrorMessage(this.client, status).send()
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        case 'switchacc': {
          const targetLowID = parseInt(args[0], 10)
          const password = args[1]

          if (this.client.player.accountPassword === '') {
            await new ServerErrorMessage(this.client, 'You must set a password first before switching accounts.').send()
          }

          if (this.client.player.lowID === targetLowID) {
            await new ServerErrorMessage(this.client, 'You are already logged into this account.').send()
            break
          }

          if (!targetLowID) {
            await new ServerErrorMessage(this.client, 'Usage: /switchacc <ID> <PASSWORD>').send()
            break
          }

          if (!password) {
            await new ServerErrorMessage(this.client, 'Password is required.').send()
            break
          }

          const targetPlayer = await this.client.mongoose?.mongoosePlayers?.findOne({ lowID: targetLowID })
          if (!targetPlayer) {
            await new ServerErrorMessage(this.client, `ID ${targetLowID} was not found.`).send()
            break
          }

          if (String(targetPlayer.accountPassword || '') !== String(password)) {
            await new ServerErrorMessage(this.client, 'Password is incorrect.').send()
            break
          }

          player.switchAccountTarget = targetPlayer.lowID
          player.switchAccountToken = `${player.lowID}:${Date.now()}`
          player.markModified('switchAccountTarget')
          player.markModified('switchAccountToken')
          await player.save()

          this.client.player = targetPlayer
          this.client.userObject = Object.assign({}, {
            highID: targetPlayer.highID,
            lowID: targetPlayer.lowID,
            token: targetPlayer.token
          })

          await new ServerErrorMessage(this.client, 'Account switched successfully.').send()
          break
        }

        case 'setpassword': {
          const password = args[0]
          if (!password) {
            await new ServerErrorMessage(this.client, 'Usage: /setpassword <PASSWORD>').send()
            break
          }
          player.accountPassword = password
          player.markModified('accountPassword')
          await player.save()
          await new ServerErrorMessage(this.client, 'Password has been set.').send()
          break
        }

        // max all cards
        case 'max': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            for (const card of player.cards) {
              const maxLevel = GetMaxLevel(card.ID)
              card.level = maxLevel
              card.xpPoints = 0
            }

            player.level = 13
            player.xpPoints = 0

            player.markModified('cards')
            player.markModified('level')
            player.markModified('xpPoints')
            await player.save()
            
            await new ServerErrorMessage(this.client, "Maxed out all cards!").send()
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        // unlock all cards
        case 'unlock': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            let cardsCount = utils.randomInt(1, 94)
            let cards = cardUtils.getCards(cardsCount)
            cards.forEach(card => {
              let cardCount = utils.randomInt(0, 94)
              this.writeVInt(cardsCount - cards.indexOf(card)) // CardIndex
              this.writeVInt(cardUtils.SCIDtoInstanceID(card.id))

              this.writeVInt(this.client.player.highID)
              this.writeVInt(this.client.player.lowID)
              this.writeVInt(cardCount) //CardCount
              this.writeVInt(0)
              this.writeVInt(0)
              this.writeByte(127)

              cardUtils.addCardPointsBySCID(this.client, card.id, cardCount)
            })
            
            await new ServerErrorMessage(this.client, "Unlocked all cards!").send()
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        // sets gold 
        case 'gold': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            const amount = parseInt(args[0], 10)

            //console.log(amount)

            if (isNaN(amount)) {
              break
            }

            player.gold = amount
            player.markModified('gold')
            await player.save()
            
            await new ServerErrorMessage(this.client, `Selected gold amount ${amount}!`).send()
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        // sets gems 
        case 'gems': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            const amount = parseInt(args[0], 10)

            //console.log(amount)

            if (isNaN(amount)) {
              break
            }

            player.gems = amount
            player.markModified('gems')
            await player.save()
            
            await new ServerErrorMessage(this.client, `Selected gems amount ${amount}!`).send()
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        // sets trophies 
        case 'trophies': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            const amount = parseInt(args[0], 10)

            //console.log(amount)

            if (isNaN(amount)) {
              break
            }

            player.trophies = amount
            player.markModified('trophies')
            await player.save()
            
            await new ServerErrorMessage(this.client, `Selected trophy amount ${amount}!`).send()
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        // promotes a player to an admin 
        case 'admin': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            const targetID = parseInt(args[0], 10)

            config.Server.Admins.push(targetID)
            fs.writeFileSync(
                "./config.json",
                JSON.stringify(config, null, 4)
            );
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        // demotes an admin to a player 
        case 'unadmin': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            const targetID = parseInt(args[0], 10)

            config.Server.Admins = config.Server.Admins.filter(id => id !== targetID);
            fs.writeFileSync(
                "./config.json",
                JSON.stringify(config, null, 4)
            );
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        // bans an acc
        case 'ban': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            const targetID = parseInt(args[0], 10)

            config.Server.Banned.push(targetID)
            fs.writeFileSync(
                "./config.json",
                JSON.stringify(config, null, 4)
            )
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        // unbans an acc
        case 'unban': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            const targetID = parseInt(args[0], 10)

            config.Server.Banned = config.Server.Banned.filter(id => id !== targetID);
            fs.writeFileSync(
                "./config.json",
                JSON.stringify(config, null, 4)
            );
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }

        // starts a maintenance
        case 'maintenance': {
          if (config.Server.Admins.includes(this.client.player.lowID)) {
            const maintenanceSeconds = parseInt(args[0], 10) // set any number to enable or set 0 to disable

            if (maintenanceSeconds == 0) {
              config.Server.MaintenanceEnabled = false
              config.Server.MaintenanceSeconds = 0
            } else {
              config.Server.MaintenanceEnabled = true
              config.Server.MaintenanceSeconds = maintenanceSeconds
            } 
            fs.writeFileSync(
                "./config.json",
                JSON.stringify(config, null, 4)
            );
          }
          else {
            await new ServerErrorMessage(this.client, `Only admins can use the /${command} command.`).send()
          }

          break
        }
      }
    }
    else {
      const db = this.client.mongoose
      const clan = await db.getClanByID(this.client.player.clan?.ClanHighID, this.client.player.clan?.ClanLowID)

      if (clan) {
        const existingMessages = Array.isArray(clan.messages) ? clan.messages : []

        const messageEntry = {
          id: existingMessages.reduce((max, message) => Math.max(max, Number(message.id) || 0), 0) + 1,
          senderHighID: this.client.player.highID,
          senderLowID: this.client.player.lowID,
          senderName: this.client.player.name,
          senderRole: this.client.player.clan?.ClanRole || 1,
          message: this.data.Message,
          timestamp: Date.now()
        }

        clan.messages = existingMessages.concat(messageEntry)
        clan.messages = clan.messages.slice(-100)
        clan.markModified('messages')
        await clan.save()

        const entry = { ...this.data, ...messageEntry }
        entry.StreamEntryType = 2

        const onlineClanMembers = Array.from(connectedClients).filter(client => {
          return client && client.player && client.player.inClan &&
            client.player.clan?.ClanHighID === clan.highID &&
            client.player.clan?.ClanLowID === clan.lowID
        })

        for (const client of onlineClanMembers) {
          try {
            await new AllianceStreamEntryMessage(client, entry).send()
          } catch (e) { console.log(e) }
        }
      } else return
    }
  }
}

module.exports = ChatToAllianceStreamMessage