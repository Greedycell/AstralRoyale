const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')

class LeaveAllianceMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15985
    this.version = 1
  }

  async decode () {}

  async process () {
    await new AvailableServerCommandMessage(this.client, 205).send()
  }
}

module.exports = LeaveAllianceMessage