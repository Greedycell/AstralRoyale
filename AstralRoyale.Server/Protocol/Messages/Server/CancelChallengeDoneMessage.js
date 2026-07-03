const PiranhaMessage = require('../../PiranhaMessage')

class CancelChallengeDoneMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20416
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = CancelChallengeDoneMessage