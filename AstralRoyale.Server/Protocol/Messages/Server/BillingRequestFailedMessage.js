const PiranhaMessage = require('../../PiranhaMessage')

class BillingRequestFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 26879
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = BillingRequestFailedMessage