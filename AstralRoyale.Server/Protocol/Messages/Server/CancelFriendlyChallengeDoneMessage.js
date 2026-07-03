const PiranhaMessage = require('../../PiranhaMessage')

class CancelFriendlyChallengeDoneMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20702
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = CancelFriendlyChallengeDoneMessage