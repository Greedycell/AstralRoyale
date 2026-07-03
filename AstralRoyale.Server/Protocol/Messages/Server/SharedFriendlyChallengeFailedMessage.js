const PiranhaMessage = require('../../PiranhaMessage')

class SharedFriendlyChallengeFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 21448
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = SharedFriendlyChallengeFailedMessage