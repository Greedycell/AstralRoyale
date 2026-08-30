const PiranhaMessage = require('../../PiranhaMessage')

class AvatarOnlineStatusUpdatedMessage extends PiranhaMessage {
  constructor (client, friendHighID, friendLowID, friendStatus) {
    super()
    this.id = 20206
    this.client = client
    this.version = 1
    this.friendHighID = friendHighID
    this.friendLowID = friendLowID
    this.friendStatus = friendStatus
  }

  async encode () {
    /*
    Status:
    2 = Online
    3 = Busy
    */

    this.writeLong(this.friendHighID, this.friendLowID) // Id
    this.writeVInt(this.friendStatus) // Status
  }
}

module.exports = AvatarOnlineStatusUpdatedMessage