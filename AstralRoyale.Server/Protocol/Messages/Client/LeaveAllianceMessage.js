const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')
const LogicLeaveAllianceCommand = require('../../Commands/Server/LogicLeaveAllianceCommand')
const AllianceLeaveOkMessage = require('../Server/AllianceLeaveOkMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')
const AllianceStreamEntryMessage = require('../Server/AllianceStreamEntryMessage')
const ConnectedClients = require('../../../Core/ConnectedClients')

class LeaveAllianceMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15985
    this.version = 1
  }

  async decode () {}

  async process () {
    const player = this.client.player
    const db = this.client.mongoose

    if (!player.inClan) {
      await new OutOfSyncMessage(this.client).send()
      return
    }

    try {
      await new AvailableServerCommandMessage(this.client, 290).send()
      await new AllianceLeaveOkMessage(this.client).send()
      await db.leaveClan(player)

      const clan = await db.getClanByID(player.clan.ClanHighID, player.clan.ClanLowID)
      if (clan) {
        const existingMessages = Array.isArray(clan.messages) ? clan.messages : []
        const entry = {
          id: existingMessages.reduce((max, message) => Math.max(max, Number(message.id) || 0), 0) + 1,
          StreamEntryType: 4,
          senderHighID: this.client.player.highID,
          senderLowID: this.client.player.lowID,
          senderName: this.client.player.name || '',
          senderRole: this.client.player.clan?.ClanRole || 1,
          timestamp: Date.now(),
          eventType: 4,
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
      }
    } catch (err) {
      console.error('Error:', err)
      await new LoginFailedMessage(this.client, 3, 'Failed to leave clan. Please try again.').send()
    }
  }
}

module.exports = LeaveAllianceMessage