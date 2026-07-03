const PiranhaMessage = require('../../PiranhaMessage')
const PlayerJWTokenMessage = require('../Server/PlayerJWTokenMessage')

class AskPlayerJWTokenMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15689
    this.version = 1
  }

  async decode () {}

  async process () {
    await new PlayerJWTokenMessage(this.client).send()
  }
}

module.exports = AskPlayerJWTokenMessage