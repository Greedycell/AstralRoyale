const PiranhaMessage = require('../../PiranhaMessage')

class KunlunBillingProcessedByServerMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 21297
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = KunlunBillingProcessedByServerMessage