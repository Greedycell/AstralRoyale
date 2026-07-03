const PiranhaMessage = require('../../PiranhaMessage')
const MatchmakingLobby = require('../../../../AstralRoyale.Battle/Logic/MatchmakingLobby')
const MatchmakeInfoMessage = require('../Server/MatchmakeInfoMessage')
const CancelChallengeDoneMessage = require('../Server/CancelChallengeDoneMessage')

// this is the cancel tournament matchmake message
class CancelSurvivalMatchmakeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 18141
    this.version = 1
  }

  async decode () {}

  async process () {
    await new MatchmakeInfoMessage(this.client, 0 /* 0 = no more seconds */).send()
    await new Promise(resolve => setTimeout(resolve, 500))
    await new CancelChallengeDoneMessage(this.client).send()

    MatchmakingLobby.removePlayer(this.client)
  }
}

module.exports = CancelSurvivalMatchmakeMessage