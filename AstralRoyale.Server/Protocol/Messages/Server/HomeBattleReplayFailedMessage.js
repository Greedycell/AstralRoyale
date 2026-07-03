const PiranhaMessage = require('../../PiranhaMessage')

class HomeBattleReplayFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29692
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0)
  }
}

module.exports = HomeBattleReplayFailedMessage