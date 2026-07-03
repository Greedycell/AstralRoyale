const PiranhaMessage = require('../../PiranhaMessage')

class AllianceMemberMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25050
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceMemberMessage