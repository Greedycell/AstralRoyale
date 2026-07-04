const PiranhaMessage = require('../../PiranhaMessage')
const AvatarStreamMessage = require('../Server/AvatarStreamMessage')

class AskForAvatarStreamMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 17101
    this.version = 1
  }

  async decode () {}

  async process () {
    await new AvatarStreamMessage(this.client).send()
  }
}

module.exports = AskForAvatarStreamMessage
