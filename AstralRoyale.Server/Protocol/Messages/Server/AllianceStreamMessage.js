const PiranhaMessage = require('../../PiranhaMessage')

class AllianceStreamMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24719
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceStreamMessage