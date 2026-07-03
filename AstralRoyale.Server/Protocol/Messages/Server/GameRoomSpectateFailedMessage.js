const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomSpectateFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24168
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomSpectateFailedMessage