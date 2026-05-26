const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')

class ChangeAvatarNameMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14315
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Name = this.readString()
    this.data.ChangeState = this.readVInt()

    //console.log(this.data)
  }

  async process () {
    if (this.client.player.nameChangesCount > 1) {
      return
    }
    if (this.data.Name.length < 2 || this.data.Name.length > 15) {
      return
    }

    this.client.player.name = this.data.Name
    this.client.player.nameChangesCount += 1

    this.client.player.markModified('name')
    this.client.player.markModified('nameChangesCount')
    await this.client.player.save()

    this.writeString(this.data.Name)
    this.writeVInt(this.data.ChangeState)

    await new AvailableServerCommandMessage(this.client, 278).send()

    //this.client.destroy()
  }
}

module.exports = ChangeAvatarNameMessage