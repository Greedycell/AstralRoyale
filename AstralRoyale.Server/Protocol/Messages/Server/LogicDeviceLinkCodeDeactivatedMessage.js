const PiranhaMessage = require('../../PiranhaMessage')

class LogicDeviceLinkCodeDeactivatedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27592
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = LogicDeviceLinkCodeDeactivatedMessage