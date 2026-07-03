const PiranhaMessage = require('../../PiranhaMessage')

class AllianceMemberRemovedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 21753
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = AllianceMemberRemovedMessage