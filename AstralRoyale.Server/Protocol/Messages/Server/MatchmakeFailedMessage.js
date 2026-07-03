const PiranhaMessage = require('../../PiranhaMessage')

class MatchmakeFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27213
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(0)
  }
}

module.exports = MatchmakeFailedMessage