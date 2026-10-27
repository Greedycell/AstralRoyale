const PiranhaMessage = require('../../PiranhaMessage')

class InvalidConnectionMessage extends PiranhaMessage {
  constructor (bytes, client, player) {
    super(bytes)
    this.client = client
    this.player = player
    this.id = 18245
    this.version = 0
  }

  async decode () {
  }

  async process () {
    await new Promise(resolve => setTimeout(resolve, 1000))

    this.client.destroy() // this will show the "??? didn't send any data." message if u access the server from the browser
  }
}

module.exports = InvalidConnectionMessage