const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const AllianceJoinOkMessage = require('../Server/AllianceJoinOkMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')

class JoinAllianceMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 16190
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
    } catch (e) {
      console.error(e)
      await new OutOfSyncMessage(this.client).send()
    }
  }
}

module.exports = JoinAllianceMessage