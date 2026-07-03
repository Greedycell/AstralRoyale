const PiranhaMessage = require('../../PiranhaMessage')
const HomeBattleReplayDataMessage = require('../Server/HomeBattleReplayDataMessage')

class HomeBattleReplayMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15075
    this.version = 1
  }

  async decode () {}

  async process () {
    await new HomeBattleReplayDataMessage(this.client).send()
  }
}

module.exports = HomeBattleReplayMessage