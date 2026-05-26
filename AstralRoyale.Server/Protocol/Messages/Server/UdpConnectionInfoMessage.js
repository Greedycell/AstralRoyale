const PiranhaMessage = require('../../PiranhaMessage')

class UdpConnectionInfoMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24112
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(9449) // ServerPort
    this.writeString('194.223.79.40') // ServerHost
    this.writeLogicLong(0, 1) // SessionID
    this.writeStringReference('nonce') // Nonce
  }
}

module.exports = UdpConnectionInfoMessage