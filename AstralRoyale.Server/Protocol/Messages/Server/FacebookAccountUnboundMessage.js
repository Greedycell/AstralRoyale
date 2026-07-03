const PiranhaMessage = require('../../PiranhaMessage')

class FacebookAccountUnboundMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 21360
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = FacebookAccountUnboundMessage