const PiranhaMessage = require('../../PiranhaMessage')

class GamecenterAccountBoundMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22385
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GamecenterAccountBoundMessage