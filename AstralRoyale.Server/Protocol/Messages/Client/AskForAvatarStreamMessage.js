const PiranhaMessage = require('../../PiranhaMessage')

class AskForAvatarStreamMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 17101
    this.version = 1
  }

  async decode () {}

  async process () {
  }
}

module.exports = AskForAvatarStreamMessage
