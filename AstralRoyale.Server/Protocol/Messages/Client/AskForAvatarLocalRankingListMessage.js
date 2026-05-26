const PiranhaMessage = require('../../PiranhaMessage')
const AvatarLocalRankingListMessage = require('../Server/AvatarLocalRankingListMessage')

class AskForAvatarLocalRankingListMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11639
    this.version = 1
  }

  async decode () {}

  async process () {
    await new AvatarLocalRankingListMessage(this.client).send()
  }
}

module.exports = AskForAvatarLocalRankingListMessage