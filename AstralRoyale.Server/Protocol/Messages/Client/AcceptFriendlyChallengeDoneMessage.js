const PiranhaMessage = require('../../PiranhaMessage')
const FriendlyChallengeAcceptedMessage = require('../Server/FriendlyChallengeAcceptedMessage')

class AcceptFriendlyChallengeDoneMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 16068
    this.version = 1
  }

  async decode () {}

  async process () {
    await new FriendlyChallengeAcceptedMessage(this.client).send()
  }
}

module.exports = AcceptFriendlyChallengeDoneMessage