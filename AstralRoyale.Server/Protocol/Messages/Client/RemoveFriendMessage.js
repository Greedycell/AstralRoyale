const PiranhaMessage = require('../../PiranhaMessage')

class RemoveFriendMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 18476
    this.version = 1
  }

  async decode () {}

  async process () {}
}

module.exports = RemoveFriendMessage