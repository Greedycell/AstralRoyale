const PiranhaMessage = require('../../PiranhaMessage')
const InboxListMessage = require('../Server/InboxListMessage')

class InboxOpenedMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10517
    this.version = 1
  }

  async decode () {}

  async process () {
    await new InboxListMessage(this.client).send()
  }
}

module.exports = InboxOpenedMessage