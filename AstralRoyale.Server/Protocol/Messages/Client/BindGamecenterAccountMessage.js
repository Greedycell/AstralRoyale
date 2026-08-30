const PiranhaMessage = require('../../PiranhaMessage')
const GamecenterAccountBoundMessage = require('../Server/GamecenterAccountBoundMessage')

class BindGamecenterAccountMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 18691
    this.version = 1
  }

  async decode () {}

  async process () {
    await new GamecenterAccountBoundMessage(this.client).send()
  }
}

module.exports = BindGamecenterAccountMessage