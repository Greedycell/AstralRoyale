const PiranhaMessage = require('../../PiranhaMessage')

class AvatarStreamEntryRemovedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 21597
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AvatarStreamEntryRemovedMessage