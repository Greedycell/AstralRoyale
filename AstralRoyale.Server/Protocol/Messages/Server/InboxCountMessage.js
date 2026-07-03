const PiranhaMessage = require('../../PiranhaMessage')

class InboxCountMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27317
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(0) // InboxNewMessageCount
  }
}

module.exports = InboxCountMessage