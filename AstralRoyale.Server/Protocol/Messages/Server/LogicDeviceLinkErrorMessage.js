const PiranhaMessage = require('../../PiranhaMessage')

class LogicDeviceLinkErrorMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 28925
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = LogicDeviceLinkErrorMessage