const PiranhaMessage = require('../../PiranhaMessage')
const FacebookAccountBoundMessage = require('../Server/FacebookAccountBoundMessage')
const FacebookAccountUnboundMessage = require('../Server/FacebookAccountUnboundMessage')
const FacebookAccountAlreadyBoundMessage = require('../Server/FacebookAccountAlreadyBoundMessage')

class BindFacebookAccountMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15890
    this.version = 1
  }

  async decode () {}

  async process () {
    await new FacebookAccountBoundMessage(this.client).send()
  }
}

module.exports = BindFacebookAccountMessage