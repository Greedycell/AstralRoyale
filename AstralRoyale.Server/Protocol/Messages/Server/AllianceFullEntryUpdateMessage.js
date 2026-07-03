const PiranhaMessage = require('../../PiranhaMessage')

class AllianceFullEntryUpdateMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24430
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceFullEntryUpdateMessage