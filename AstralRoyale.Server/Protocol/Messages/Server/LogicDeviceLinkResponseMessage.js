const PiranhaMessage = require('../../PiranhaMessage')

class LogicDeviceLinkResponseMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20192
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = LogicDeviceLinkResponseMessage