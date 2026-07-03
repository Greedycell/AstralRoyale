const PiranhaMessage = require('../../PiranhaMessage')

class AllianceStreamEntryMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 21075
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceStreamEntryMessage