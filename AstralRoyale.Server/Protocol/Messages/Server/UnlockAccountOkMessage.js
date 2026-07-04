const PiranhaMessage = require('../../PiranhaMessage')

class UnlockAccountOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25352
    this.client = client
    this.version = 1
  }

  async encode () {
    if (this.client.player.accountLocked === 1) {
      this.client.player.accountLocked = 0
      this.client.player.markModified('accountLocked')
      await this.client.player.save()
    }

    this.writeLong(this.client.player.highID, this.client.player.lowID)
    this.writeString(this.client.player.token)
  }
}

module.exports = UnlockAccountOkMessage