const PiranhaMessage = require('../../PiranhaMessage')

class AppleBillingProcessedByServerMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 26029
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AppleBillingProcessedByServerMessage