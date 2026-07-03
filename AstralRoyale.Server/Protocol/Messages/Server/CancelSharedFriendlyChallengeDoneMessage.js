const PiranhaMessage = require('../../PiranhaMessage')

class CancelSharedFriendlyChallengeDoneMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 23407
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = CancelSharedFriendlyChallengeDoneMessage