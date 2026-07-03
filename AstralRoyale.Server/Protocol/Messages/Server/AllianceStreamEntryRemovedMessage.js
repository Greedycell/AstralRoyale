const PiranhaMessage = require('../../PiranhaMessage')

class AllianceStreamEntryRemovedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25643
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceStreamEntryRemovedMessage