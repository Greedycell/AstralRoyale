const PiranhaMessage = require('../../PiranhaMessage')

class UnlockAccountOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20132
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeLong(this.client.player.highID, this.client.player.lowID)
    this.writeString(this.client.player.token)
  }
}

module.exports = UnlockAccountOkMessage