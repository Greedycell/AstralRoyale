const PiranhaMessage = require('../../PiranhaMessage')
const AllianceInvitationSentOkMessage = require('../Server/AllianceInvitationSentOkMessage')
const AllianceInvitationSendFailedMessage = require('../Server/AllianceInvitationSendFailedMessage')

class VisitHomeDataMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14813
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.HighID = this.readInt()
    this.data.LowID = this.readInt()

    //console.log(this.data)
  }

  async process () {
    await new AllianceInvitationSentOkMessage(this.client).send()
    //await new AllianceInvitationSendFailedMessage(this.client, 6).send()
  }
}

module.exports = VisitHomeDataMessage