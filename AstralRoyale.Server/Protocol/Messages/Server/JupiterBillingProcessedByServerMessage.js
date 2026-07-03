const PiranhaMessage = require('../../PiranhaMessage')

class JupiterBillingProcessedByServerMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22793
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = JupiterBillingProcessedByServerMessage