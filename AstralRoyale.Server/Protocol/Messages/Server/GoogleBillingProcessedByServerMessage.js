const PiranhaMessage = require('../../PiranhaMessage')

class GoogleBillingProcessedByServerMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 23135
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = GoogleBillingProcessedByServerMessage