const PiranhaMessage = require('../../PiranhaMessage')
const GameRoomsMessage = require('../Server/GameRoomsMessage')

class SearchGameRoomsMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11259
    this.version = 1
  }

  async decode () {}

  async process () {
    await new GameRoomsMessage(this.client).send()
  }
}

module.exports = SearchGameRoomsMessage