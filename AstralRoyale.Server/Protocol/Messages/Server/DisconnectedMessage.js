const PiranhaMessage = require('../../PiranhaMessage')

class DisconnectedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22890
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(1)
  }
}

module.exports = DisconnectedMessage