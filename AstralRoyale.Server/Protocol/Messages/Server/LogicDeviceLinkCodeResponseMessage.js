const PiranhaMessage = require('../../PiranhaMessage')

class LogicDeviceLinkCodeResponseMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29308
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = LogicDeviceLinkCodeResponseMessage