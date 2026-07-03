const PiranhaMessage = require('../../PiranhaMessage')

class FriendListUpdateMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24876
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeLong(0, 1) // HighID, LowID
    this.writeBoolean(true)
    this.writeLong(0, 1) // HighID, LowID
    this.writeString('Unnamed') // Name
    this.writeString('') // FacebookID
    this.writeString('') // GamecenterID
    this.writeVInt(1) // Level
    this.writeVInt(0) // Score
    this.writeBoolean(false) // InClan
    this.writeVInt(1) // Arena
    this.writeString('')
    this.writeString('')
    this.writeVInt(0)
    this.writeInt(0) // ChallengeState
    this.writeInt(0) // ChallengeWins
  }
}

module.exports = FriendListUpdateMessage