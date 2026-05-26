const PiranhaMessage = require('../../PiranhaMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')

class CreateAllianceMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11033
    this.version = 1
  }

  async decode () {}

  async process () {
    await new LoginFailedMessage(this.client, 3, "Not yet implemented.").send()
  }
}

module.exports = CreateAllianceMessage