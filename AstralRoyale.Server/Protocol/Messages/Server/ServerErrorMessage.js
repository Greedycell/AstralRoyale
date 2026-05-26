const PiranhaMessage = require('../../PiranhaMessage')

class ServerErrorMessage extends PiranhaMessage {
  constructor (client, message) {
    super()
    this.id = 24115
    this.client = client
    this.version = 1
    this.message = message
  }

  async encode () {
    this.writeString(this.message)
  }
}

module.exports = ServerErrorMessage