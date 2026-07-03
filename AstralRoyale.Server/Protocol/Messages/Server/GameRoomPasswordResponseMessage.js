const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomPasswordResponseMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 23502
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomPasswordResponseMessage