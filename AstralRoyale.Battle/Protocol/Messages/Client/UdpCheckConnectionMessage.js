const PiranhaMessage = require('../../PiranhaMessage')

class UdpCheckConnectionMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10108
    this.version = 1
  }

  async decode () {}

  async process () {}
}

module.exports = UdpCheckConnectionMessage