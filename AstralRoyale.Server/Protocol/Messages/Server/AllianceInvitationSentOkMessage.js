const PiranhaMessage = require('../../PiranhaMessage')

class AllianceInvitationSentOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24973
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceInvitationSentOkMessage