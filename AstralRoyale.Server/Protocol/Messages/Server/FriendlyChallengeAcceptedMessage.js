const PiranhaMessage = require('../../PiranhaMessage')

class FriendlyChallengeAcceptedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27414
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = FriendlyChallengeAcceptedMessage