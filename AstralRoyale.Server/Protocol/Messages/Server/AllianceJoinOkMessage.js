const PiranhaMessage = require('../../PiranhaMessage')

class AllianceJoinOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22170
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceJoinOkMessage