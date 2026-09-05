const PiranhaMessage = require('../../PiranhaMessage')

class AvatarOnlineStatusListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22682
    this.client = client
    this.version = 9
  }

  async encode () {
    /*
    Status:
    2 = Online
    3 = Busy
    */

    this.writeVInt(1) // Count
    {
      this.writeVInt(2) // Status
      this.writeLong(0, 1) // Id
    }
    this.writeVInt
  }
}

module.exports = AvatarOnlineStatusListMessage