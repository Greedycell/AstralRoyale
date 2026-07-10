const PiranhaMessage = require('../../PiranhaMessage')
const ClientHome = require('../../../Logic/ClientHome')
const ClientAvatar = require('../../../Logic/ClientAvatar')

class OwnHomeDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 28502
    this.client = client
    this.version = 1
  }

  async encode () {
    new ClientHome().encode(this)
    await new ClientAvatar().encode(this)
  }
}

module.exports = OwnHomeDataMessage