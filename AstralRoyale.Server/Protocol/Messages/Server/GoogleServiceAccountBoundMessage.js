const PiranhaMessage = require('../../PiranhaMessage')

class GoogleServiceAccountBoundMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24781
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GoogleServiceAccountBoundMessage