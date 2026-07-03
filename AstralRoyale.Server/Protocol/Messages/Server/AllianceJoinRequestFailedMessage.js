const PiranhaMessage = require('../../PiranhaMessage')

class AllianceJoinRequestFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 28956
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceJoinRequestFailedMessage