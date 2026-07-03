const PiranhaMessage = require('../../PiranhaMessage')

class PlayerJWTokenMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22726
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = PlayerJWTokenMessage