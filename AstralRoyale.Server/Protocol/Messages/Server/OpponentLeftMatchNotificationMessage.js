const PiranhaMessage = require('../../PiranhaMessage')

class OpponentLeftMatchNotificationMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 28448
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = OpponentLeftMatchNotificationMessage