const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25191
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomDataMessage