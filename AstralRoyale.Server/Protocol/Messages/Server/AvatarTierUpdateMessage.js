const PiranhaMessage = require('../../PiranhaMessage')

class AvatarTierUpdateMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 26068
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AvatarTierUpdateMessage