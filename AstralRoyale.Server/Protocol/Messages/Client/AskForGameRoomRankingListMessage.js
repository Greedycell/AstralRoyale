const PiranhaMessage = require('../../PiranhaMessage')
const GameRoomRankingListMessage = require('../Server/GameRoomRankingListMessage')

class AskForGameRoomRankingListMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15029
    this.version = 1
  }

  async decode () {}

  async process () {
    await new GameRoomRankingListMessage(this.client).send()
  }
}

module.exports = AskForGameRoomRankingListMessage