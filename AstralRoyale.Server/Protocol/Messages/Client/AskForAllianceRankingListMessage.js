const PiranhaMessage = require('../../PiranhaMessage')
const AllianceRankingListMessage = require('../Server/AllianceRankingListMessage')
const AllianceLocalRankingListMessage = require('../Server/AllianceLocalRankingListMessage')

class AskForAllianceRankingListMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14171
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.IsLocal = this.readBoolean()

    //console.log(this.data)
  }

  async process () {
    /*if (this.data.IsLocal) {
      await new AllianceLocalRankingListMessage(this.client).send()
    } else {*/
      await new AllianceRankingListMessage(this.client).send()
    //}
  }
}

module.exports = AskForAllianceRankingListMessage