const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')

class ChangeAvatarNameMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 19863
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Name = this.readString()

    //console.log(this.data)
  }

  async process () {
    if (this.client.player.nameChangesCount > 1) {
      await new OutOfSyncMessage(this.client).send()
      return
    }
    if (this.data.Name.length < 2 || this.data.Name.length > 15) {
      await new OutOfSyncMessage(this.client).send()
      return
    }

    this.client.player.name = this.data.Name
    this.client.player.nameChangesCount += 1

    this.client.player.markModified('name')
    this.client.player.markModified('nameChangesCount')
    await this.client.player.save()

    await new AvailableServerCommandMessage(this.client, 278).send()

    //this.client.destroy()
  }
}

module.exports = ChangeAvatarNameMessage