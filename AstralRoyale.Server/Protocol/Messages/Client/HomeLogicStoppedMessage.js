const PiranhaMessage = require('../../PiranhaMessage')

class HomeLogicStoppedMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11010
    this.version = 1
  }

  async decode () {}

  async process () {}
}

module.exports = HomeLogicStoppedMessage