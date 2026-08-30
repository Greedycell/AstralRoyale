const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const AllianceJoinOkMessage = require('../Server/AllianceJoinOkMessage')
const AllianceStreamMessage = require('../Server/AllianceStreamMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')
const AllianceStreamEntryMessage = require('../Server/AllianceStreamEntryMessage')
const ConnectedClients = require('../../../Core/ConnectedClients')

class JoinAllianceUsingTokenMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 17190
    this.version = 1
  }

  async decode () {
    this.data = {}

    const [highID, lowID] = this.readLong()
    this.data.AllianceHighID = highID
    this.data.AllianceLowID = lowID

    //console.log(this.data)
  }

  async process () {
    const player = this.client.player
    const db = this.client.mongoose

    if (player.inClan) {
      await new OutOfSyncMessage(this.client).send() // Already in a clan
      return
    }

    const clan = await db.getClanByID(this.data.AllianceHighID, this.data.AllianceLowID)

    if (!clan) {
      await new OutOfSyncMessage(this.client).send()
      return
    }

    try {
      await db.joinClan(player, clan)

      await new AvailableServerCommandMessage(this.client, 263, this.data).send() // join
      await new AllianceJoinOkMessage(this.client).send()
      await new AllianceStreamMessage(this.client).send()

      const existingMessages = Array.isArray(clan.messages) ? clan.messages : []
      const entry = {
        id: existingMessages.reduce((max, message) => Math.max(max, Number(message.id) || 0), 0) + 1,
        StreamEntryType: 4,
        senderHighID: this.client.player.highID,
        senderLowID: this.client.player.lowID,
        senderName: this.client.player.name,
        senderRole: this.client.player.clan?.ClanRole || 1,
        timestamp: Date.now(),
        eventType: 3,
        targetHighID: this.client.player.highID,
        targetLowID: this.client.player.targetLowID,
        targetName: this.client.player.name
      }

      clan.messages = existingMessages.concat(entry).slice(-100)
      clan.markModified('messages')
      await clan.save()

      for (const client of ConnectedClients) {
        try {
          await new AllianceStreamEntryMessage(client, entry).send()
        } catch (error) {
          console.log(error)
        }
      }
    } catch (e) {
      console.error(e)
      await new OutOfSyncMessage(this.client).send()
    }
  }
}

module.exports = JoinAllianceUsingTokenMessage