const PiranhaMessage = require('../../PiranhaMessage')

class AllianceChangeFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29685
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceChangeFailedMessage