const PiranhaMessage = require('../../PiranhaMessage')

class RoyalTVContentMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20073
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0) // Count
    {
    }
  }
}

module.exports = RoyalTVContentMessage