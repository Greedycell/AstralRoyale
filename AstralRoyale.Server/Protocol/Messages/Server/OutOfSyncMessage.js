const PiranhaMessage = require('../../PiranhaMessage')

class OutOfSyncMessage extends PiranhaMessage {
  constructor (client, serverChecksum, clientChecksum) {
    super()
    this.id = 25424
    this.client = client
    this.version = 1
    this.serverChecksum = serverChecksum
    this.clientChecksum = clientChecksum
  }

  async encode () {
    this.writeVInt(this.serverChecksum)
    this.writeVInt(this.clientChecksum)
    this.writeVInt(0)
  }
}

module.exports = OutOfSyncMessage