const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')
const LogicLeaveAllianceCommand = require('../../Commands/Server/LogicLeaveAllianceCommand')
const AllianceLeaveOkMessage = require('../Server/AllianceLeaveOkMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')

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
      //await new LoginFailedMessage(this.client, 3, 'Left clan!').send()

      await db.leaveClan(player)
    } catch (err) {
      console.error('Error:', err)
      await new LoginFailedMessage(this.client, 3, 'Failed to leave clan. Please try again.').send()
    }
  }
}

module.exports = LeaveAllianceMessage