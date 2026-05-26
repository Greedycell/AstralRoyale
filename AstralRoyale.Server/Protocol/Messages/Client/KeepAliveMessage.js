const PiranhaMessage = require('../../PiranhaMessage')
const KeepAliveOkMessage = require('../Server/KeepAliveOkMessage')

class KeepAliveMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 19911
    this.version = 1
  }

  async decode () {}

  async process () {
    await new KeepAliveOkMessage(this.client).send()
  }
}

module.exports = KeepAliveMessage