const PiranhaMessage = require('../../PiranhaMessage')

class ChatToAllianceStreamMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10554
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Message = this.readString()

    //console.log(this.data)
  }

  async process () {
    if (!this.client.player.inClan) return

    this.writeString(this.data.Message)
    
    this.writeVInt(2) // StreamEntryType
    this.writeLogicLong(this.client.player.highID, this.client.player.lowID)
    this.writeLogicLong(this.client.player.highID, this.client.player.lowID)
    this.writeLogicLong(this.client.player.highID, this.client.player.lowID)
    this.writeString(this.client.player.name)
    this.writeVInt(1) // Level
    this.writeVInt(this.client.player.clan.ClanRole) // Role (1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader)
    this.writeVInt(0) // AgeSeconds
    this.writeBoolean(false) // IsRemoved
  }
}

module.exports = ChatToAllianceStreamMessage