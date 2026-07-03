const PiranhaMessage = require('../../PiranhaMessage')
const JoinableAllianceListMessage = require('../Server/JoinableAllianceListMessage')

class AskForJoinableAlliancesListMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10857
    this.version = 1
  }

  async decode () {}

  async process () {
    await new JoinableAllianceListMessage(this.client).send()
  }
}

module.exports = AskForJoinableAlliancesListMessage