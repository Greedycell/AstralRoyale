const PiranhaMessage = require('../../PiranhaMessage')

class SetDeviceTokenMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 13363
    this.version = 1
  }

  async decode () {}

  async process () {}
}

module.exports = SetDeviceTokenMessage