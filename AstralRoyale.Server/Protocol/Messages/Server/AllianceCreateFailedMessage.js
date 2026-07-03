const PiranhaMessage = require('../../PiranhaMessage')

class AllianceCreateFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27720
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0)
  }
}

module.exports = AllianceCreateFailedMessage