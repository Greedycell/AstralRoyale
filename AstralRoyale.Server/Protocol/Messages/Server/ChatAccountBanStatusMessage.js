const PiranhaMessage = require('../../PiranhaMessage')

class ChatAccountBanStatusMessage extends PiranhaMessage {
  constructor (client, reason) {
    super()
    this.id = 20326
    this.client = client
    this.version = 1
    this.reason = reason
  }

  async encode () {
    this.writeVInt(reason)
  }
}

module.exports = ChatAccountBanStatusMessage