const PiranhaMessage = require('../../PiranhaMessage')

class ServerErrorMessage extends PiranhaMessage {
  constructor (client, message) {
    super()
    this.id = 20574
    this.client = client
    this.version = 1
    this.message = message
  }

  async encode () {
    this.writeString(this.message)
  }
}

module.exports = ServerErrorMessage