const fs = require("fs");

const PiranhaMessage = require('../../PiranhaMessage')
const cardUtils = require('../../../Utils/cardUtils')
const utils = require('../../../Utils')
const Cards = require('../../../Utils/json/cards.json')
const ServerErrorMessage = require('../Server/ServerErrorMessage')

const config = require('../../../config.json')

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
              //'/status',
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
      // TODO: Clan messages
    }
  }
}

module.exports = ChatToAllianceStreamMessage