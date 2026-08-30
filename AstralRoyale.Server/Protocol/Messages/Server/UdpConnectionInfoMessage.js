const PiranhaMessage = require('../../PiranhaMessage')
const config = require('../../../config.json')

class UdpConnectionInfoMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25513
    this.client = client
    this.version = 27
  }

  async encode () {
    this.writeVInt(config.Server.UdpPort) // ServerPort
    this.writeString(config.Server.UdpIP) // ServerHost
    this.writeLogicLong(0, 1) // SessionID
    this.writeStringReference('nonce') // Nonce
  }
}

module.exports = UdpConnectionInfoMessage