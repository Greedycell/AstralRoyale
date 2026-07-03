const PiranhaMessage = require('../../PiranhaMessage')

class GamecenterAccountAlreadyBoundMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 21142
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GamecenterAccountAlreadyBoundMessage