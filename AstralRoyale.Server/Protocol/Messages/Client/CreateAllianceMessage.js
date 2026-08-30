const fs = require('fs')
const path = require('path')

const PiranhaMessage = require('../../PiranhaMessage')
const AllianceCreateFailedMessage = require('../Server/AllianceCreateFailedMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const AllianceStreamMessage = require('../Server/AllianceStreamMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')
const ServerErrorMessage = require('../Server/ServerErrorMessage')
const config = require('../../../config.json')

const filter = fs.readFileSync(path.join(__dirname, '../../../filter.json'), 'utf8').split(/\r?\n/).filter(word => word.length > 0)
function containsFilteredWord (text) {
  if (!config.Server.WordFilter) return false
  return filter.some(word => {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(escapedWord, 'i').test(text)
  })
}

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
      await new AllianceCreateFailedMessage(this.client, 3).send()
      return
    }

    if (this.data.Name.trim().length < 2 || this.data.Name.trim().length > 15) {
      await new AllianceCreateFailedMessage(this.client, 4).send()
      return
    }

    if (containsFilteredWord(this.data.Name)) {
      await new AllianceCreateFailedMessage(this.client, 1).send()
      return
    }
    else if (containsFilteredWord(this.data.Description || '')) {
      await new AllianceCreateFailedMessage(this.client, 2).send()
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
      await new AllianceStreamMessage(this.client).send()
    } catch (e) {
      console.error(e)
      await new AllianceCreateFailedMessage(this.client, 0).send()
    }
  }
}

module.exports = CreateAllianceMessage