const PiranhaMessage = require('../../PiranhaMessage')

class KickAllianceMemberOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 26310
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = KickAllianceMemberOkMessage