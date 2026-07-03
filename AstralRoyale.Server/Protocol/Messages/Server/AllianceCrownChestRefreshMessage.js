const PiranhaMessage = require('../../PiranhaMessage')

class AllianceCrownChestRefreshMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29463
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceCrownChestRefreshMessage