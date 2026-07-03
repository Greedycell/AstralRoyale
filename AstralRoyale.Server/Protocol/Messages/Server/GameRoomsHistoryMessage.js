const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomsHistoryMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 28394
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GameRoomsHistoryMessage