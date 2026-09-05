const PiranhaMessage = require('../../PiranhaMessage')

class AllianceStreamEntryRemovedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25643
    this.client = client
    this.version = 11
  }

  async encode () {
    this.writeLong(0, 0) // EntryId
  }
}

module.exports = AllianceStreamEntryRemovedMessage