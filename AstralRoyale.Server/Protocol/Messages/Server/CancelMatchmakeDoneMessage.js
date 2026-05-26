const PiranhaMessage = require('../../PiranhaMessage')

class CancelMatchmakeDoneMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20817
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = CancelMatchmakeDoneMessage