const PiranhaMessage = require('../../PiranhaMessage')
const GameRoomsMessage = require('../Server/GameRoomsMessage')

class SearchGameRoomsMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11259
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.searchString = this.readString()

    //console.log(this.data)
  }

  async process () {
    await new GameRoomsMessage(this.client, this.data.searchString).send()
  }
}

module.exports = SearchGameRoomsMessage