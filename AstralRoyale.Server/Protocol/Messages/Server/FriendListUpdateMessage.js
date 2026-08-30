const PiranhaMessage = require('../../PiranhaMessage')

class FriendListUpdateMessage extends PiranhaMessage {
  constructor (client, friend) {
    super()
    this.id = 24876
    this.client = client
    this.version = 1
    this.friend = friend
  }

  async encode () {
    this.writeLong(this.friend.highID, this.friend.lowID) // HighID, LowID
    this.writeBoolean(true)
    this.writeLong(this.friend.highID, this.friend.lowID) // HighID, LowID
    this.writeString(this.friend.name) // Name
    this.writeVInt(0)
    this.writeVInt(this.friend.trophies) // Score
    this.writeBoolean(this.friend.inClan == 1) // HasAlliance
    if (this.friend.inClan === 1) {
      let clan = null
      if (this.client && this.client.mongoose && typeof this.client.mongoose.getClanByID === 'function') {
        try {
          clan = await this.client.mongoose.getClanByID(this.friend.clan.ClanHighID, this.friend.clan.ClanLowID)
        } catch (e) {
          console.error(e)
          clan = null
        }
      }

      this.writeLong(this.friend.clan.ClanHighID, this.friend.clan.ClanLowID)
      this.writeString(clan ? String(clan.name || '') : '')
      this.writeVInt(clan.badge + 1)
      this.writeVInt(this.friend.clan.ClanRole) // 1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader
    }
    this.writeBoolean(true) // HasLeague
    this.writeVInt(54)
    this.writeVInt(this.friend.arena) // Arena
    this.writeString(null)
    this.writeString(null)
    this.writeVInt(0) // FriendType
  }
}

module.exports = FriendListUpdateMessage