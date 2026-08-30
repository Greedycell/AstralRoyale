const PiranhaMessage = require('../../PiranhaMessage')

class FriendsListMessage extends PiranhaMessage {
  constructor (client, type) {
    super()
    this.id = 29494
    this.client = client
    this.version = 3
    this.type = type
  }

  async encode () {
    this.writeInt(this.type) // 0 = Invited | 1 = Facebook (?) | 2 = Gamecenter (?)
    this.writeInt(0) // FriendsCount
    {
    }

    /*this.writeInt(this.type) // 0 = Invited | 1 = Facebook (?) | 2 = Gamecenter (?)
    this.writeInt(2) // FriendsCount
    {
      this.writeLong(0, 27) // HighID, LowID
      this.writeBoolean(true)
      this.writeLong(0, 27) // HighID, LowID
      this.writeString('cartyrty') // Name
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
    {
      this.writeLong(0, 28) // HighID, LowID
      this.writeBoolean(true)
      this.writeLong(0, 28) // HighID, LowID
      this.writeString('Gamemaster2022') // Name
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
    }*/
  }
}

module.exports = FriendsListMessage