const PiranhaMessage = require('../../PiranhaMessage')
const MatchmakeInfoMessage = require('../Server/MatchmakeInfoMessage')
const CancelMatchmakeDoneMessage = require('../Server/CancelMatchmakeDoneMessage')

class CancelTournamentBattleMessage extends PiranhaMessage {
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
    await new CancelMatchmakeDoneMessage(this.client).send()
  }
}

module.exports = CancelTournamentBattleMessage