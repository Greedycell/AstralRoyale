const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomMatchmakeNotificationMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25235
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomMatchmakeNotificationMessage