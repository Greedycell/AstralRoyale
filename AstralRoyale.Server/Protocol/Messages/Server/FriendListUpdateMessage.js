const PiranhaMessage = require('../../PiranhaMessage')

class FriendListUpdateMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24876
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeLong(2, 2) // HighID, LowID
    this.writeBoolean(true)
    this.writeLong(2, 2) // HighID, LowID
    this.writeString('Unnamed') // Name
    this.writeVInt(0)
    this.writeVInt(3000) // Score
    this.writeBoolean(true) // HasAlliance
    {
      this.writeLong(0, 1)
      this.writeString('Clashers')
      this.writeVInt(57)
      this.writeVInt(1)
    }
    this.writeBoolean(true) // HasLeague
    this.writeVInt(54)
    this.writeVInt(1) // Arena
    this.writeString(null)
    this.writeString(null)
    this.writeVInt(0) // FriendType
  }
}

module.exports = FriendListUpdateMessage
