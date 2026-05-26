const PiranhaMessage = require('../../PiranhaMessage')

class AskForBattleReplayStreamMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15827
    this.version = 1
  }

  async decode () {}

  async process () {
  }
}

module.exports = AskForBattleReplayStreamMessage
