const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomStatusMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27183
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomStatusMessage