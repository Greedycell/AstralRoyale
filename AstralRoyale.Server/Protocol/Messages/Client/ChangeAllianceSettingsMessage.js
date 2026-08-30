const fs = require('fs')
const path = require('path')

const PiranhaMessage = require('../../PiranhaMessage')
const AllianceChangeFailedMessage = require('../Server/AllianceChangeFailedMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')
const AllianceDataMessage = require('../Server/AllianceDataMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
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

class ChangeAllianceSettingsMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10587
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Description = this.readString()
    this.readVInt()
    this.data.Badge = this.readVInt()
    this.data.Type = this.readVInt()
    this.data.RequiredTrophies = this.readVInt()
    this.readVInt()
    this.data.Location = this.readVInt()

    //console.log(this.data)
  }

  async process () {
    const player = this.client.player
    const db = this.client.mongoose

    if (!player.inClan) {
      await new OutOfSyncMessage(this.client).send()
      return
    }

    // Only Leader (2) and Co-Leader (4) can change settings
    const role = player.clan.ClanRole
    if (role !== 2 && role !== 4) {
      await new OutOfSyncMessage(this.client).send()
      return
    }

    if (containsFilteredWord(this.data.Description || '')) {
      await new AllianceChangeFailedMessage(this.client).send()
      return
    }

    // TODO: Invite Only
    if (this.data.Type === 2) {
      await new ServerErrorMessage(this.client, "Invite Only is not implemented yet.").send()
      return
    }

    try {
      const clan = await db.getClanByID(player.clan.ClanHighID, player.clan.ClanLowID)
      if (!clan) {
        await new OutOfSyncMessage(this.client).send()
        return
      }

      await db.updateClanSettings(clan, {
        description: this.data.Description,
        badge: this.data.Badge,
        type: this.data.Type,
        requiredTrophies: this.data.RequiredTrophies,
        location: this.data.Location
      })
    } catch (error) {
      console.error(error)
      await new LoginFailedMessage(this.client, 3, 'Failed to update clan settings.').send()
    }
  }
}

module.exports = ChangeAllianceSettingsMessage