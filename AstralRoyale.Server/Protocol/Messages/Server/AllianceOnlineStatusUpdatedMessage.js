const PiranhaMessage = require('../../PiranhaMessage')

class AllianceOnlineStatusUpdatedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24457
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceOnlineStatusUpdatedMessage