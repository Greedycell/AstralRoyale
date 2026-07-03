const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomJoinFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29980
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomJoinFailedMessage