const PiranhaMessage = require('../../PiranhaMessage')

class AvatarOnlineStatusUpdated extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20206
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AvatarOnlineStatusUpdated