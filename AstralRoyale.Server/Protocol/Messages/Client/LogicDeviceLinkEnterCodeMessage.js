const PiranhaMessage = require('../../PiranhaMessage')
const LogicDeviceLinkDoneMessage = require('../Server/LogicDeviceLinkDoneMessage')
const LogicDeviceLinkNewDeviceLinkedMessage = require('../Server/LogicDeviceLinkNewDeviceLinkedMessage')
const LogicDeviceLinkCodeDeactivatedMessage = require('../Server/LogicDeviceLinkCodeDeactivatedMessage')
const LogicDeviceLinkResponseMessage = require('../Server/LogicDeviceLinkResponseMessage')

class LogicDeviceLinkEnterCodeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11629
    this.version = 1
  }

  async decode () {}

  async process () {
    await new LogicDeviceLinkDoneMessage(this.client).send()
  }
}

module.exports = LogicDeviceLinkEnterCodeMessage