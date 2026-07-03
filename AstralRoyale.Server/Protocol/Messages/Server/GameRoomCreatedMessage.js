const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomCreatedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25207
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomCreatedMessage