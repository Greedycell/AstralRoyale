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

    this.data.IsLocal = this.readByte()
    this.data.result = this.readByte()
    if (this.data.result === 1) {
      this.data.AllianceId = this.readLong()
    }

    //console.log(this.data)
  }

  async process () {
    /*
    Global:
    IsLocal id 0 means u open global alliance ranking and ur not in a clan
    IsLocal id 2 means u open global alliance ranking and ur in a clan

    Local:
    IsLocal id 1 means u open local alliance ranking and ur not in a clan
    IsLocal id 3 means u open local alliance ranking and ur in a clan
    */

    if (this.data.IsLocal === 3 || this.data.IsLocal === 1) {
      await new AllianceLocalRankingListMessage(this.client).send()
    } else if (this.data.IsLocal === 2 || this.data.IsLocal === 0) {
      await new AllianceRankingListMessage(this.client).send()
    }
  }
}

module.exports = AskForAllianceRankingListMessage