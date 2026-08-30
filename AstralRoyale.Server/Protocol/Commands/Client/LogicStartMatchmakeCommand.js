const MatchmakingLobby = require('../../../Core/MatchmakingLobby')
const UdpConnectionInfoMessage = require('../../Messages/Server/UdpConnectionInfoMessage')
const MatchmakeInfoMessage = require('../../Messages/Server/MatchmakeInfoMessage')
const SectorStateMessage = require('../../Messages/Server/SectorStateMessage')
const LogicBattle = require('../../../Core/LogicBattle')
const StopHomeLogicMessage = require('../../Messages/Server/StopHomeLogicMessage')

const config = require('../../../config.json')

class LogicStartMatchmakeCommand {
  constructor () {}

  async decode(self) {
    this.data = {}

    self.readVInt()
    self.readVInt()
    self.readVInt()
    self.readVInt()
    this.data.Is2v2 = self.readVInt()

    //console.log(this.data)
  }

  async process(self) {
    let arena = self.client.player.arena + 2 || 3
    let data = {
      arena: arena,
      gamemode: 7,
      live: false
    }

    if (config.Server.FakeMultiplayer) {
      const queueType = 'normal'
      self.client.matchmakeQueueType = queueType
      const matchResult = MatchmakingLobby.addPlayer(self.client, queueType)
      const opponent = {}
      opponent.player = {}
      opponent.player.markModified = function (value) {}
      opponent.player.save = function (value) {}
      opponent.player.highID = -1
      opponent.player.lowID = -1
      opponent.player.name = 'Trainer Astral'
      const battle = await new LogicBattle(34)
      battle.battleType = '1v1'
      battle.clients.push(self.client, opponent)
      battle.start(500, self.client, opponent)
      await new StopHomeLogicMessage(self.client).send()
      await new UdpConnectionInfoMessage(self.client).send()
      let data = {
        arena: 28,
        gamemode: 7
      }
      await new SectorStateMessage(self.client, 1, self.client, opponent.player, data).send()
      MatchmakingLobby.removePlayer(self.client, queueType)
      MatchmakingLobby.removePlayer(opponent, queueType)
      return
    }

    if (!this.data.Is2v2) { // normal 1v1
      await new MatchmakeInfoMessage(self.client, 300).send()

      const queueType = self.client.matchmakeMode === 'tournament' ? 'tournament' : 'normal'
      self.client.matchmakeQueueType = queueType
      const matchResult = MatchmakingLobby.addPlayer(self.client, queueType)
      const opponent = matchResult.opponent

      if (!opponent) {
        self.client.log(`${self.client.player.lowID} is queueing!`)
        return
      }
      self.client.log(`${self.client.player.lowID} vs ${opponent.player.lowID}`)

      const battle = await new LogicBattle(data)
      battle.battleType = '1v1'
      battle.clients.push(self.client, opponent)
      battle.start(500, self.client, opponent)

      await new StopHomeLogicMessage(self.client).send()
      await new UdpConnectionInfoMessage(self.client).send()
      await new SectorStateMessage(self.client, 1, self.client, opponent, data).send()

      if (opponent) {
        await new StopHomeLogicMessage(opponent).sendOpponent(opponent)
        await new UdpConnectionInfoMessage(opponent).sendOpponent(opponent)
        await new SectorStateMessage(opponent, 1, opponent, self.client, data).sendOpponent(opponent)
      }

      MatchmakingLobby.removePlayer(self.client, queueType)
      MatchmakingLobby.removePlayer(opponent, queueType)
    } else {
      await new MatchmakeInfoMessage(self.client, 300).send()

      const queueType = '2v2'
      self.client.matchmakeQueueType = queueType
      const matchResult = MatchmakingLobby.addPlayer(self.client, queueType)
      const group = matchResult.group

      if (!group) {
        self.client.log(`${self.client.player.lowID} is queueing for 2v2!`)
        return
      }

      const battle = await new LogicBattle(data)
      battle.battleType = '2v2'
      battle.clients.push(...group)
      battle.start(500, ...group)

      for (const client of group) {
        await new StopHomeLogicMessage(client).send()
        await new UdpConnectionInfoMessage(client).send()
      }

      for (const client of group) {
        const opponent = group.find(candidate => candidate.player.lowID !== client.player.lowID)
        if (opponent) {
          await new SectorStateMessage(client, 2, opponent.player, arena).send()
        }
      }

      for (const client of group) {
        MatchmakingLobby.removePlayer(client, queueType)
      }
    }
  }
}

module.exports = LogicStartMatchmakeCommand