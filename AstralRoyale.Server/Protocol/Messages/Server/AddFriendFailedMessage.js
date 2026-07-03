const PiranhaMessage = require('../../PiranhaMessage')

class AddFriendFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25406
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0)
  }
}

module.exports = AddFriendFailedMessage