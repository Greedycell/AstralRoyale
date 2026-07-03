const PiranhaMessage = require('../../PiranhaMessage')

class JoinableGameRoomsMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 28294
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0)
  }
}

module.exports = JoinableGameRoomsMessage