const PiranhaMessage = require('../../PiranhaMessage')

class FacebookAccountBoundMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22293
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = FacebookAccountBoundMessage