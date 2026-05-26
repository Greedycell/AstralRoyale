const PiranhaMessage = require('../../PiranhaMessage')
const JoinableAlliancesListMessage = require('../Server/JoinableAlliancesListMessage')

class AskForJoinableAlliancesListMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10857
    this.version = 1
  }

  async decode () {}

  async process () {
    await new JoinableAlliancesListMessage(this.client).send()
  }
}

module.exports = AskForJoinableAlliancesListMessage