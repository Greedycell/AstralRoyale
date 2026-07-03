const PiranhaMessage = require('../../PiranhaMessage')
const AllianceJoinOkMessage = require('../Server/AllianceJoinOkMessage')

class JoinAllianceUsingInvitationMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 19597
    this.version = 1
  }

  async decode () {}

  async process () {
    await new AllianceJoinOkMessage(this.client).send()
  }
}

module.exports = JoinAllianceUsingInvitationMessage