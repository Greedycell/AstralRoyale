const PiranhaMessage = require('../../PiranhaMessage')

class LogicDeviceLinkDoneMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 21986
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = LogicDeviceLinkDoneMessage