const PiranhaMessage = require('../../PiranhaMessage')

class MatchmakeInfoMessage extends PiranhaMessage {
  constructor (client, matchmakingSeconds) {
    super()
    this.id = 24107
    this.client = client
    this.version = 1
    this.matchmakingSeconds = matchmakingSeconds
  }

  async encode () {
    this.writeInt(this.matchmakingSeconds)
  }
}

module.exports = MatchmakeInfoMessage