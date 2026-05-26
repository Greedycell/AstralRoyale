const PiranhaMessage = require('../../PiranhaMessage')

class AllianceDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 26550
    this.client = client
    this.version = 1
  }

  async encode () {
    // AllianceHeaderEntry
    {
      this.writeLong(this.client.player.clan.ClanHighID, this.client.player.clan.ClanLowID)
      this.writeString(this.client.player.clan.ClanName)

      this.writeVInt(16)
      this.writeVInt(this.client.player.clan.Badge)

      this.writeVInt(1) // Type
      this.writeVInt(1) // MemberCount

      this.writeVInt(0) // Score
      this.writeVInt(0) // RequiredScore
    }

    // AllianceFullEntry
    {
      this.writeVInt(0)
      this.writeVInt(0)
      this.writeVInt(0)

      this.writeVInt(91)
      this.writeVInt(0) // Donations per week
      this.writeVInt(0)

      this.writeVInt(1)
      this.writeVInt(0)
      this.writeVInt(57)

      this.writeVInt(1) // Region
      this.writeVInt(0)

      this.writeString('test description') // Description
    }

    // AllianceMemberEntry
    {
      this.writeByte(1) // MemberCount
      this.writeLong(this.client.player.highID, this.client.player.lowID) // ID
      this.writeString(this.client.player.name) // Name

      // Arena
      this.writeVInt(54)
      this.writeVInt(11)

      this.writeVInt(this.client.player.clan.ClanRole) // Role (1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader)
      this.writeVInt(this.client.player.level) // Level
      this.writeVInt(this.client.player.trophies) // Trophies

      this.writeVInt(0) // Donated
      this.writeVInt(0) // Donations Received

      this.writeVInt(0) // Current Rank
      this.writeVInt(0) // Previus Rank

      this.writeVInt(40) // Chest Crowns
      this.writeBoolean(false) // Not in this Clan Chest
      this.writeVInt(0)
      this.writeVInt(0)
      this.writeVInt(0)

      this.writeVInt(7)

      this.writeLong(this.client.player.highID, this.client.player.lowID)
    }

    // Clan Chest
    {
      this.writeBoolean(true)
      this.writeVInt(3) // State 0 = Preparation, 1 = Live, 2 = Over, 3 = Not active
      this.writeVInt(3600) // Seconds
      this.writeVInt(300 * 2) // Crowns/Wins

      this.writeInt(0) // Begin (+Preparation)
      this.writeInt(1594578202) // End

      this.writeVInt(3446115) // Low Id (?)
      this.writeVInt(1) // High Id (?)

      this.writeVInt(0)
    }
  }
}

module.exports = AllianceDataMessage