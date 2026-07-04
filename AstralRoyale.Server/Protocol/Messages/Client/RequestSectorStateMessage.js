const PiranhaMessage = require('../../PiranhaMessage')

class RequestSectorStateMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11747
    this.version = 1
  }

  async decode () {}

  async process () {}
}

module.exports = RequestSectorStateMessage