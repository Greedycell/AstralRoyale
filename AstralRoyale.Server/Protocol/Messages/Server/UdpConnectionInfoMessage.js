const PiranhaMessage = require('../../PiranhaMessage')

class UdpConnectionInfoMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25513
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(9449) // ServerPort
    this.writeString('127.0.0.1') // ServerHost
    this.writeLogicLong(0, 1) // SessionID
    this.writeStringReference('nonce') // Nonce

    /*
    this.writeHex('63A90000620000BB9101')
    this.writeVInt(9449)
    this.writeString('194.223.79.40')
    this.writeString('oM.Z.î^.}S')
    this.writeString('oWeQRYzA9nLyqWfd1-VxQ-PrnhHR9GcewMjxpZje8JA')
    */
  }
}

module.exports = UdpConnectionInfoMessage