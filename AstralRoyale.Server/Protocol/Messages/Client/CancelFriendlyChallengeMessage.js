const PiranhaMessage = require('../../PiranhaMessage')
const CancelFriendlyChallengeDoneMessage = require('../Server/CancelFriendlyChallengeDoneMessage')

class CancelFriendlyChallengeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 18201
    this.version = 1
  }

  async decode () {}

  async process () {
    await new Promise(resolve => setTimeout(resolve, 500))
    await new CancelFriendlyChallengeDoneMessage(this.client).send()
  }
}

module.exports = CancelFriendlyChallengeMessage