const PiranhaMessage = require('../../PiranhaMessage')
const CancelChallengeDoneMessage = require('../Server/CancelChallengeDoneMessage')

class CancelChallengeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15860
    this.version = 1
  }

  async decode () {}

  async process () {
    await new Promise(resolve => setTimeout(resolve, 500))
    await new CancelChallengeDoneMessage(this.client).send()
  }
}

module.exports = CancelChallengeMessage