const PiranhaMessage = require('../../PiranhaMessage')

class BattleReportStreamMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20032
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = BattleReportStreamMessage