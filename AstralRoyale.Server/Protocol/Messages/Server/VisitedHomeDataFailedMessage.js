const PiranhaMessage = require('../../PiranhaMessage')

class VisitedHomeDataFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22399
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = VisitedHomeDataFailedMessage