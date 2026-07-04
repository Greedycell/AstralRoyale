const PiranhaMessage = require('../../PiranhaMessage')
const MatchmakingLobby = require('../../../Core/MatchmakingLobby')
const MatchmakeInfoMessage = require('../Server/MatchmakeInfoMessage')
const CancelMatchmakeDoneMessage = require('../Server/CancelMatchmakeDoneMessage')

class CancelMatchmakeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 12269
    this.version = 1
  }

  async decode () {}

  async process () {
    await new MatchmakeInfoMessage(this.client, 0 /* 0 = no more seconds */).send()
    await new Promise(resolve => setTimeout(resolve, 500))
    await new CancelMatchmakeDoneMessage(this.client).send()

    const queueType = this.client.matchmakeQueueType || (this.client.matchmakeMode === 'tournament' ? 'tournament' : 'normal')
    MatchmakingLobby.removePlayer(this.client, queueType)
  }
}

module.exports = CancelMatchmakeMessage