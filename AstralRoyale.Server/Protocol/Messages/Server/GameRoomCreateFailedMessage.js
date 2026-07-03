const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomCreateFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27808
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomCreateFailedMessage