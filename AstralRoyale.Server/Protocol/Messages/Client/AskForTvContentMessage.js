const PiranhaMessage = require('../../PiranhaMessage')
const RoyalTVContentMessage = require('../Server/RoyalTVContentMessage')

class AskForTvContentMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10185
    this.version = 1
  }

  async decode () {}

  async process () {
    await new RoyalTVContentMessage(this.client).send()
  }
}

module.exports = AskForTvContentMessage
