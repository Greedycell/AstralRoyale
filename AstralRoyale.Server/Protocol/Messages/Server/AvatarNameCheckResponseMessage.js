const PiranhaMessage = require('../../PiranhaMessage')

class AvatarNameCheckResponseMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25350
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AvatarNameCheckResponseMessage