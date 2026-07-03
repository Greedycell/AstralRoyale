const PiranhaMessage = require('../../PiranhaMessage')

class AvatarOnlineStatusListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22682
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AvatarOnlineStatusListMessage