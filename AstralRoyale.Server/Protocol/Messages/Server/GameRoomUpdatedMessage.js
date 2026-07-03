const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomUpdatedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22023
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomUpdatedMessage