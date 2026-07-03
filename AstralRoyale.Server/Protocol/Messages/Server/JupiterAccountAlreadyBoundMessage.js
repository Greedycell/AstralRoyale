const PiranhaMessage = require('../../PiranhaMessage')

class JupiterAccountAlreadyBoundMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27446
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = JupiterAccountAlreadyBoundMessage