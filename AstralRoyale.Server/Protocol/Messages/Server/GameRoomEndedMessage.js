const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomEndedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 28714
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomEndedMessage