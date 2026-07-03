const PiranhaMessage = require('../../PiranhaMessage')

class AllianceJoinFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25107
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceJoinFailedMessage