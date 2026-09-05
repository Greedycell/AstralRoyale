const PiranhaMessage = require('../../PiranhaMessage')
const GameRoomsMessage = require('../Server/GameRoomsMessage')

class PlayerJWTokenMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22726
    this.client = client
    this.version = 1
  }

  async encode () {
    await new GameRoomsMessage(this.client, '').send()
  }
}

module.exports = PlayerJWTokenMessage