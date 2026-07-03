const PiranhaMessage = require('../../PiranhaMessage')

class ChangeAllianceMemberRoleOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29058
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = ChangeAllianceMemberRoleOkMessage