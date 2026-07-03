const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomsMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 23160
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0) // GameRoomsCount
  }
}

module.exports = GameRoomsMessage