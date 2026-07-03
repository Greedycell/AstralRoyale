const PiranhaMessage = require('../../PiranhaMessage')

class AvatarStreamEntryMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22837
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AvatarStreamEntryMessage