const PiranhaMessage = require('../../PiranhaMessage')
const AllianceCreateFailedMessage = require('../Server/AllianceCreateFailedMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')
const ServerErrorMessage = require('../Server/ServerErrorMessage')

class CreateAllianceMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11033
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Name = this.readString()
    this.data.Description = this.readString()
    this.readVInt()
    this.data.Badge = this.readVInt()
    this.data.Type = this.readVInt()  // 0 = Open, 1 = Invite Only, 2 = Closed
    this.data.RequiredTrophies = this.readVInt()
    this.data.Location = this.readVInt()
    this.data.Location = this.readVInt()

    //console.log(this.data)
  }

  async process () {
    const player = this.client.player
    const db = this.client.mongoose

    if (player.inClan) {
      await new OutOfSyncMessage(this.client).send() // Already in a clan
      return
    }

    if (!this.data.Name || this.data.Name.trim().length === 0) {
      await new OutOfSyncMessage(this.client).send() // Name is required
      return
    }

    // TODO: Invite Only
    if (this.data.Type === 2) {
      await new ServerErrorMessage(this.client, "Invite Only is not implemented yet.").send()
      return
    }

    try {
      await db.createClan(player, {
        name: this.data.Name.trim(),
        description: this.data.Description || '',
        badge: this.data.Badge,
        type: this.data.Type,
        requiredTrophies: this.data.RequiredTrophies,
        location: this.data.Location
      })

      await new AvailableServerCommandMessage(this.client, 263, this.data).send() // join
      await new AvailableServerCommandMessage(this.client, 206, this.data).send() // change role
      //await new AllianceCreateFailedMessage(this.client).send()
    } catch (e) {
      console.error(e)
      await new AllianceCreateFailedMessage(this.client).send()
    }
  }
}

module.exports = CreateAllianceMessage