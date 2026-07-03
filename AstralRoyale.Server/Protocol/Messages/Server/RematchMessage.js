const PiranhaMessage = require('../../PiranhaMessage')

class RematchMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29246
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(0)
  }
}

module.exports = RematchMessage