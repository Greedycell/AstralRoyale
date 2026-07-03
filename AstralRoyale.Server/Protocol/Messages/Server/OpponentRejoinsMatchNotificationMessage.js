const PiranhaMessage = require('../../PiranhaMessage')

class OpponentRejoinsMatchNotificationMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29802
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = OpponentRejoinsMatchNotificationMessage