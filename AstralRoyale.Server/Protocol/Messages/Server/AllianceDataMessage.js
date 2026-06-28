const PiranhaMessage = require('../../PiranhaMessage')

class AllianceDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 26550
    this.client = client
    this.version = 1
  }

  async encode () {
    /*const player = this.client.player
    const db = this.client.mongoose

    let clan = null
    if (player.inClan) {
      clan = await db.getClanByID(player.clan.ClanHighID, player.clan.ClanLowID)
    }

    const clanHighID = clan ? clan.highID : player.clan.ClanHighID
    const clanLowID = clan ? clan.lowID : player.clan.ClanLowID
    const clanName = clan ? clan.name : player.clan.ClanName
    const clanBadge = clan ? clan.badge : (player.clan.ClanBadge || 1)
    const clanType = clan ? clan.type : 0
    const clanDesc = clan ? clan.description : ''
    const clanScore = clan ? clan.trophies : 0
    const clanReqScore = clan ? clan.requiredTrophies: 0
    const clanLocation = clan ? clan.location : 57
    const members = clan ? clan.members : []
    const memberCount = members.length || 1

    // AllianceHeaderEntry
    {
      this.writeLong(clanHighID, clanLowID)
      this.writeString(clanName)

      this.writeVInt(16)
      this.writeVInt(clanBadge)

      this.writeVInt(clanType)
      this.writeVInt(memberCount)

      this.writeVInt(clanScore)
      this.writeVInt(clanReqScore)
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

      this.writeString(clanDesc)
    }

    // AllianceMemberEntry
    {
      this.writeByte(members.length)

      for (const member of members) {
        this.writeLong(member.highID, member.lowID)
        this.writeString(member.name || '')

        // Arena
        this.writeVInt(54)
        this.writeVInt(11)

        this.writeVInt(member.role || 1) // Role
        this.writeVInt(member.level || 1) // Level
        this.writeVInt(member.trophies || 0) // Trophies

        this.writeVInt(member.donated || 0) // Donated
        this.writeVInt(member.donationsReceived || 0) // Donations Received

        this.writeVInt(0) // CurrentRank
        this.writeVInt(0) // PreviousRank

        this.writeVInt(40) // Chest Crowns
        this.writeBoolean(false) // Not in this Clan Chest
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(0)

        this.writeVInt(7)

        this.writeLong(member.highID, member.lowID)
      }
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
    }*/

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
      this.writeVInt(0) // DonationsReceived

      this.writeVInt(0) // CurrentRank
      this.writeVInt(0) // PreviousRank

      this.writeVInt(0) // ChestCrowns
      this.writeBoolean(false) // Not in this Clan Chest
      this.writeVInt(0)
      this.writeVInt(0)
      this.writeVInt(0)

      this.writeVInt(7)

      this.writeLong(this.client.player.highID, this.client.player.lowID)
    }

    // Clan Chest
    {
      let clanchest = false
      this.writeBoolean(clanchest)
      if (clanchest == true) {
        this.writeVInt(3) // State 0 = Preparation, 1 = Live, 2 = Over, 3 = Not active
        this.writeVInt(3600) // Seconds
        this.writeVInt(0) // Crowns/Wins

        this.writeInt(0) // Begin (+Preparation)
        this.writeInt(1594578202) // End

        this.writeVInt(3446115) // Low Id (?)
        this.writeVInt(1) // High Id (?)

        this.writeVInt(0)
      }
    }
  }
}

module.exports = AllianceDataMessage