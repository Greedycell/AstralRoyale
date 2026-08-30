const MatchmakingLobby = require('../../../Core/MatchmakingLobby')
const UdpConnectionInfoMessage = require('../../Messages/Server/UdpConnectionInfoMessage')
const MatchmakeInfoMessage = require('../../Messages/Server/MatchmakeInfoMessage')
const SectorStateMessage = require('../../Messages/Server/SectorStateMessage')
const LogicBattle = require('../../../Core/LogicBattle')
const StopHomeLogicMessage = require('../../Messages/Server/StopHomeLogicMessage')

class LogicStartGameRoomMatchmakeCommand {
  constructor () {}

  async decode(self) {
    this.data = {}

    this.data.StartTick = self.readVInt()
    this.data.EndTick = self.readVInt()
    this.data.AccountHighID = self.readVInt()
    this.data.AccountLowID = self.readVInt()
    this.data.Is2v2 = self.readVInt()
    this.data.Unknown = self.readVInt()
    this.data.BattleEventID = self.readVInt()

    //console.log(this.data)
  }

  async process(self) {
    let arena = self.client.player.arena + 2 || 3
    let data = {
      arena: arena,
      gamemode: 7,
      live: false
    }

    await new MatchmakeInfoMessage(self.client, 300).send()

    const queueType = self.client.matchmakeMode === 'customTournament' || this.data.BattleEventID ? 'customTournament' : 'normal'
    self.client.matchmakeQueueType = queueType
    const matchResult = MatchmakingLobby.addPlayer(self.client, queueType)
    const opponent = matchResult.opponent

    if (!opponent) {
      self.client.log(`${self.client.player.lowID} is queueing!`)
      return
    }
    self.client.log(`${self.client.player.lowID} vs ${opponent.player.lowID}`)

    const battle = await new LogicBattle(data)
    battle.battleType = queueType === 'customTournament' ? 'tournament' : '1v1'
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
  }
}

module.exports = LogicStartGameRoomMatchmakeCommand