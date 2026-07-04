const PiranhaMessage = require('../../PiranhaMessage')
const GameRoomDataMessage = require('../Server/GameRoomDataMessage')

class AskForGameRoomDataMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10575
    this.version = 1
  }

  async decode () {}

  async process () {
    await new GameRoomDataMessage(this.client).send()
  }
}

module.exports = AskForGameRoomDataMessage