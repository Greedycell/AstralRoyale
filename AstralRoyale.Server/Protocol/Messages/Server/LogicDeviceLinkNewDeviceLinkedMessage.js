const PiranhaMessage = require('../../PiranhaMessage')

class LogicDeviceLinkNewDeviceLinkedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 26971
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = LogicDeviceLinkNewDeviceLinkedMessage