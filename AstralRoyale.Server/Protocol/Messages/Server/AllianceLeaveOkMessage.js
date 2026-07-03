const PiranhaMessage = require('../../PiranhaMessage')

class AllianceLeaveOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27541
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceLeaveOkMessage