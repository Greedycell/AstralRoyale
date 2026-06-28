const PiranhaMessage = require('../../PiranhaMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')

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

    // Already in a clan
    if (player.inClan) {
      return new LoginFailedMessage(this.client, 3, 'You must leave your current clan first.').send()
    }

    // Name is required
    if (!this.data.Name || this.data.Name.trim().length === 0) {
      return new LoginFailedMessage(this.client, 3, 'Clan name cannot be empty.').send()
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

      await new AvailableServerCommandMessage(this.client, 206, this.data).send()
      await new AvailableServerCommandMessage(this.client, 207, this.data).send()
      await new LoginFailedMessage(this.client, 3, 'Created clan!').send()
    } catch (error) {
      console.error(error)
      await new LoginFailedMessage(this.client, 3, 'Failed to create clan.').send()
    }
  }
}

module.exports = CreateAllianceMessage