const PiranhaMessage = require('../../PiranhaMessage')

class AvatarNameChangeFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 21995
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AvatarNameChangeFailedMessage