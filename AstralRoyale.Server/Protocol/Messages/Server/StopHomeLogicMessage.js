const PiranhaMessage = require('../../PiranhaMessage')

class StopHomeLogicMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24993
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = StopHomeLogicMessage