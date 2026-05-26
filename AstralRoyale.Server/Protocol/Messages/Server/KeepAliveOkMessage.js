const PiranhaMessage = require('../../PiranhaMessage')

class KeepAliveOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24135
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = KeepAliveOkMessage