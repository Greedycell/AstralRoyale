const PiranhaMessage = require('../../PiranhaMessage')

class Unknown15689 extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15689
    this.version = 1
  }

  async decode () {}

  async process () {
  }
}

module.exports = Unknown15689