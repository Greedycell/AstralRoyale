const MatchmakingLobby = require('../../../../AstralRoyale.Battle/Logic/MatchmakingLobby')
const UdpConnectionInfoMessage = require('../../Messages/Server/UdpConnectionInfoMessage')
const MatchmakeInfoMessage = require('../../Messages/Server/MatchmakeInfoMessage')
const SectorStateMessage = require('../../Messages/Server/SectorStateMessage')
const LogicBattle = require('../../../../AstralRoyale.Battle/Logic/LogicBattle')

class LogicStartSurvivalMatchmakeCommand {
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
    await new MatchmakeInfoMessage(self.client, 300).send()

    const opponent = MatchmakingLobby.addPlayer(self.client)

    if (!opponent) {
      self.client.log(`${self.client.player.lowID} is queueing!`)
      return
    }
    self.client.log(`${self.client.player.lowID} vs ${opponent.player.lowID}`)

    const battle = new LogicBattle()
    battle.start(500, self.client, opponent)

    await new UdpConnectionInfoMessage(self.client).send()
    await new SectorStateMessage(self.client, 1, opponent.player).send()

    if (opponent) {
      await new UdpConnectionInfoMessage(opponent).sendOpponent(opponent)
      await new SectorStateMessage(opponent, 1, self.client.player).sendOpponent(opponent)
    }

    MatchmakingLobby.removePlayer(self.client)
    MatchmakingLobby.removePlayer(opponent)
  }
}

module.exports = LogicStartSurvivalMatchmakeCommand