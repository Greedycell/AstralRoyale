const PiranhaMessage = require('../../PiranhaMessage')
const GetAllianceInviteTokenResultMessage = require('../Server/GetAllianceInviteTokenResultMessage')

class GetAllianceInviteTokenMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10309
    this.version = 1
  }

  async decode () {}

  async process () {
    await new GetAllianceInviteTokenResultMessage(this.client).send()
  }
}

module.exports = GetAllianceInviteTokenMessage