const PiranhaMessage = require('../../PiranhaMessage')

class GoogleServiceAccountAlreadyBoundMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 28682
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GoogleServiceAccountAlreadyBoundMessage