const PiranhaMessage = require('../../PiranhaMessage')

class AcceptFriendFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27558
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0)
  }
}

module.exports = AcceptFriendFailedMessage