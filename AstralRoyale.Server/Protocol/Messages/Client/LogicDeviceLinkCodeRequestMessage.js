const PiranhaMessage = require('../../PiranhaMessage')
const LogicDeviceLinkNewDeviceLinkedMessage = require('../Server/LogicDeviceLinkNewDeviceLinkedMessage')

class LogicDeviceLinkCodeRequestMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11714
    this.version = 9
  }

  async decode () {}

  async process () {
    await new LogicDeviceLinkNewDeviceLinkedMessage(this.client).send()
  }
}

module.exports = LogicDeviceLinkCodeRequestMessage