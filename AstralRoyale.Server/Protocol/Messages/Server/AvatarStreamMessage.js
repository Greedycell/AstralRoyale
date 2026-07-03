const PiranhaMessage = require('../../PiranhaMessage')

class AvatarStreamMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29567
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AvatarStreamMessage