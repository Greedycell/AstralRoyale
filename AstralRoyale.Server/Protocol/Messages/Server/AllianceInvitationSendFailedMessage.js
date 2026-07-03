const PiranhaMessage = require('../../PiranhaMessage')

class AllianceInvitationSendFailedMessage extends PiranhaMessage {
  constructor (client, reason) {
    super()
    this.id = 21561
    this.client = client
    this.version = 1
    this.reason = reason
  }

  async encode () {
    /*
    2 = Only Leaders and Co-Leaders can invite
    4 = Player already joined a clan
    5 = Already invited
    6 = Inbox full
    */

    this.writeVInt(this.reason)
  }
}

module.exports = AllianceInvitationSendFailedMessage