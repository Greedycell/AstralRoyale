const MatchmakingLobby = require('../../../Core/MatchmakingLobby')
const UdpConnectionInfoMessage = require('../../Messages/Server/UdpConnectionInfoMessage')
const MatchmakeInfoMessage = require('../../Messages/Server/MatchmakeInfoMessage')
const SectorStateMessage = require('../../Messages/Server/SectorStateMessage')
const LogicBattle = require('../../../Core/LogicBattle')
const StopHomeLogicMessage = require('../../Messages/Server/StopHomeLogicMessage')
const AllianceStreamEntryMessage = require('../../Messages/Server/AllianceStreamEntryMessage')
const AllianceStreamMessage = require('../../Messages/Server/AllianceStreamMessage')
const ConnectedClients = require('../../../Core/ConnectedClients')

class LogicStartSurvivalMatchmakeCommand {
  constructor () {}

  async decode(self) {
    this.data = {}

    this.data.Message = self.readString()
    self.readBoolean()

    self.readVInt() // ClassId
    this.data.GameMode = self.readVInt() // InstanceId

    self.readVInt()
    self.readVInt()

    self.readVInt()
    self.readVInt()

    self.readVInt()

    this.data.Arena = self.readVInt()

    //console.log(this.data)
  }

  async process(self) {
    switch (this.data.GameMode)
    {
      case 0: // Grand Challenge/Classic Challenge
        await new MatchmakeInfoMessage(self.client, 300).send()

        const queueType = 'tournament'
        self.client.matchmakeQueueType = queueType
        const matchResult = MatchmakingLobby.addPlayer(self.client, queueType)
        const opponent = matchResult.opponent

        if (!opponent) {
          self.client.log(`${self.client.player.lowID} is queueing!`)
          return
        }
        self.client.log(`${self.client.player.lowID} vs ${opponent.player.lowID}`)

        const battle = await new LogicBattle()
        battle.battleType = 'tournament'
        battle.clients.push(self.client, opponent)
        battle.start(500, self.client, opponent)

        await new StopHomeLogicMessage(self.client).send()
        await new UdpConnectionInfoMessage(self.client).send()
        await new SectorStateMessage(self.client, 1, opponent.player).send()

        if (opponent) {
          await new StopHomeLogicMessage(opponent).sendOpponent(opponent)
          await new UdpConnectionInfoMessage(opponent).sendOpponent(opponent)
          await new SectorStateMessage(opponent, 1, self.client.player).sendOpponent(opponent)
        }

        MatchmakingLobby.removePlayer(self.client, queueType)
        MatchmakingLobby.removePlayer(opponent, queueType)

        break
      case 7: { // Friendly Clan 1v1 and Friend 1v1
        const db = self.client.mongoose
        const clan = await db.getClanByID(self.client.player?.clan?.ClanHighID, self.client.player?.clan?.ClanLowID)

        const entry = {
          id: Date.now(),
          StreamEntryType: 10,
          senderHighID: self.client.player.highID,
          senderLowID: self.client.player.lowID,
          senderName: self.client.player.name || '',
          senderRole: self.client.player.clan?.ClanRole || 1,
          timestamp: Date.now(),
          Message: this.data.Message || '',
          IsRemoved: false,
          Active: true,
          Closed: false,
          Spectators: 0,
          TargetName: self.client.player.name || '',
          SenderScore: self.client.player.trophies || 0,
        }

        if (clan) {
          clan.messages = Array.isArray(clan.messages) ? clan.messages.concat(entry) : [entry]
          clan.messages = clan.messages.slice(-100)
          clan.markModified('messages')
          await clan.save()
        }

        for (const client of ConnectedClients) {
          if (!client?.player || !client.player.inClan) continue
          if (client.player.clan?.ClanHighID !== self.client.player.clan?.ClanHighID || client.player.clan?.ClanLowID !== self.client.player.clan?.ClanLowID) continue

          if (client === self.client) {
            await new AllianceStreamEntryMessage(client, entry).send()
          } else {
            await new AllianceStreamMessage(client, entry).send()
          }
        }

        break
      }
      case 14: // Friendly Clan 2v2
        const db = self.client.mongoose
        const clan = await db.getClanByID(self.client.player?.clan?.ClanHighID, self.client.player?.clan?.ClanLowID)

        const entry = {
          id: Date.now(),
          StreamEntryType: 10,
          senderHighID: self.client.player.highID,
          senderLowID: self.client.player.lowID,
          senderName: self.client.player.name || '',
          senderRole: self.client.player.clan?.ClanRole || 1,
          timestamp: Date.now(),
          Message: this.data.Message || '',
          IsRemoved: false,
          Active: true,
          Closed: false,
          Spectators: 0,
          TargetName: self.client.player.name || '',
          SenderScore: self.client.player.trophies || 0,
        }

        if (clan) {
          clan.messages = Array.isArray(clan.messages) ? clan.messages.concat(entry) : [entry]
          clan.messages = clan.messages.slice(-100)
          clan.markModified('messages')
          await clan.save()
        }

        for (const client of ConnectedClients) {
          if (!client?.player || !client.player.inClan) continue
          if (client.player.clan?.ClanHighID !== self.client.player.clan?.ClanHighID || client.player.clan?.ClanLowID !== self.client.player.clan?.ClanLowID) continue

          if (client === self.client) {
            await new AllianceStreamEntryMessage(client, entry).send()
          } else {
            await new AllianceStreamMessage(client, entry).send()
          }
        }

        break
      case 23: // Clan 2v2
        break
      default:
        break
    }
  }
}

module.exports = LogicStartSurvivalMatchmakeCommand