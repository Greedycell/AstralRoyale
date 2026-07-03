const PiranhaMessage = require('../../PiranhaMessage')

class CafeBazaarBillingProcessedByServerMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20076
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = CafeBazaarBillingProcessedByServerMessage