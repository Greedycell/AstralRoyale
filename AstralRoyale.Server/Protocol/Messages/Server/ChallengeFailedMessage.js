const PiranhaMessage = require('../../PiranhaMessage')

class ChallengeFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20685
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = ChallengeFailedMessage