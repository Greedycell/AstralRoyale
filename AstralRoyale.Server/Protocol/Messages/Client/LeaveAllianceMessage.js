const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')
const LogicLeaveAllianceCommand = require('../../Commands/Server/LogicLeaveAllianceCommand')

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
      return new LoginFailedMessage(this.client, 3, 'You are not in a clan.').send()
    }

    try {
      await db.leaveClan(player)

      await new AvailableServerCommandMessage(this.client, 205).send()
      await new LoginFailedMessage(this.client, 3, 'Left clan!').send()
    } catch (err) {
      console.error('Error:', err)
      await new LoginFailedMessage(this.client, 3, 'Failed to leave clan. Please try again.').send()
    }
  }
}

module.exports = LeaveAllianceMessage