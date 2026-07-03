const PiranhaMessage = require('../../PiranhaMessage')

class AllianceJoinRequestOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20142
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceJoinRequestOkMessage