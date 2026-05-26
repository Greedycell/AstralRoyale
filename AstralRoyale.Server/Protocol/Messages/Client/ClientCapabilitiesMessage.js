const PiranhaMessage = require('../../PiranhaMessage')

class ClientCapabilitiesMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11688
    this.version = 1
  }

  async decode () {
    this.data = {}
    
    this.data.Ping = this.readVInt()
    this.data.Interface = this.readString()

    //console.log(this.data)
  }

  async process () {
    this.writeVInt(this.data.Ping)
    this.writeString(this.data.Interface)
  }
}

module.exports = ClientCapabilitiesMessage
