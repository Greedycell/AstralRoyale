const PiranhaMessage = require('../../PiranhaMessage')

class FriendlyChallengeFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22945
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0)
  }
}

module.exports = FriendlyChallengeFailedMessage