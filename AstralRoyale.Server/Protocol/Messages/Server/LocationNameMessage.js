const PiranhaMessage = require('../../PiranhaMessage')

class LocationNameMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25649
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = LocationNameMessage