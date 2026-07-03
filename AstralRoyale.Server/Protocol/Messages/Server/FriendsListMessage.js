const PiranhaMessage = require('../../PiranhaMessage')

class FriendsListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29494
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(0) // 0 = Invited | 1 = Facebook (?) | 2 = Gamecenter (?)
    this.writeInt(0) // FriendsCount

    /*this.writeInt(0) // 0 = Invited | 1 = Facebook (?) | 2 = Gamecenter (?)
    this.writeInt(2) // FriendsCount
    {
      this.writeLong(0, 0) // HighID, LowID
      this.writeBoolean(true) 
      this.writeLong(0, 0) // HighID, LowID
      this.writeString('AstralRoyale Manager') // Name
      this.writeVInt(0)
      this.writeVInt(3000) // Score
      this.writeBoolean(true)
      {
        this.writeLong(0, 1)
        this.writeString('Clashers')
        this.writeVInt(57)
        this.writeVInt(1)
      }
      this.writeVInt(54)
      this.writeVInt(1) // Arena
      this.writeString(null)
      this.writeString(null)
      this.writeVInt(-1)
      this.writeVInt(0)
      this.writeVInt(0)

      this.writeLong(2, 2) // HighID, LowID
      this.writeBoolean(true)
      this.writeLong(2, 2) // HighID, LowID
      this.writeString('Astral 2') // Name
      this.writeVInt(0)
      this.writeVInt(2600) // Score
      this.writeBoolean(true)
      {
        this.writeLong(0, 1)
        this.writeString('Clashers')
        this.writeVInt(57)
        this.writeVInt(1)
      }
      this.writeVInt(54)
      this.writeVInt(1) // Arena
      this.writeString(null)
      this.writeString(null)
      this.writeVInt(-1)
      this.writeVInt(0)
      this.writeVInt(0)
    }*/
  }
}

module.exports = FriendsListMessage