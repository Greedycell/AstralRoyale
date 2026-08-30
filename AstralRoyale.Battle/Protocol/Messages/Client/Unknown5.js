const PiranhaMessage = require('../../PiranhaMessage')

class Unknown5 extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 5
    this.version = 1
  }

  async decode () {}

  async process () {}
}

module.exports = Unknown5