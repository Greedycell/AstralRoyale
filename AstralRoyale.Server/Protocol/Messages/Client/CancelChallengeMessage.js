const PiranhaMessage = require('../../PiranhaMessage')
const CancelChallengeDoneMessage = require('../Server/CancelChallengeDoneMessage')
const ConnectedClients = require('../../../Core/ConnectedClients')
const AllianceStreamMessage = require('../Server/AllianceStreamMessage')

class CancelChallengeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15860
    this.version = 1
  }

  async decode () {}

  async process () {
    const db = this.client.mongoose
    const clan = await db.getClanByID(this.client.player?.clan?.ClanHighID, this.client.player?.clan?.ClanLowID)

    if (clan && Array.isArray(clan.messages)) {
      const target = clan.messages.find(entry =>
        entry.StreamEntryType === 10 &&
        entry.senderHighID === this.client.player.highID &&
        entry.senderLowID === this.client.player.lowID &&
        !entry.IsRemoved
      )

      if (target) {
        target.IsRemoved = true
        target.removedAt = Date.now()
        clan.markModified('messages')
        await clan.save()

        for (const client of ConnectedClients) {
          if (!client?.player || !client.player.inClan) continue
          if (client.player.clan?.ClanHighID !== clan.highID || client.player.clan?.ClanLowID !== clan.lowID) continue
          await new AllianceStreamMessage(client).send()
        }
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500))
    await new CancelChallengeDoneMessage(this.client).send()
  }
}

module.exports = CancelChallengeMessage