const PiranhaMessage = require('../../PiranhaMessage')

class FacebookAccountAlreadyBoundMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 26304
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = FacebookAccountAlreadyBoundMessage