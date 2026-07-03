const PiranhaMessage = require('../../PiranhaMessage')

class ShutdownStartedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29442
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0)
  }
}

module.exports = ShutdownStartedMessage