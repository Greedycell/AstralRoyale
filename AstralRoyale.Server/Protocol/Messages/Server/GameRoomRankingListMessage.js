const PiranhaMessage = require('../../PiranhaMessage')

class GameRoomRankingListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 28650
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0) // GameRoomCount
  }
}

module.exports = GameRoomRankingListMessage