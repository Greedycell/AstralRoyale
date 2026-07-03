const PiranhaMessage = require('../../PiranhaMessage')

class AllianceDataMessage extends PiranhaMessage {
  constructor (client, highID, lowID) {
    super()
    this.id = 26550
    this.client = client
    this.version = 1
    this.highID = highID
    this.lowID = lowID
  }

  async encode () {
    if (this.client.player.inClan === 0) { 
      this.writeVInt(0)
      return
    }

    const db = this.client.mongoose
    const clan = await db.getClanByID(this.highID, this.lowID)

    const clanHighID = clan ? clan.highID : this.highID
    const clanLowID = clan ? clan.lowID : this.lowID
    const clanName = clan ? clan.name : 'Clashers'
    const clanBadge = clan ? clan.badge : 1
    const clanType = clan ? clan.type : 0
    const clanDesc = clan ? clan.description : ''
    const clanScore = clan ? clan.trophies : 0
    const clanReqScore = clan ? clan.requiredTrophies : 0
    const members = clan ? clan.members : []
    const memberCount = members.length || 0
    const location = clan ? clan.location : 0

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
      this.writeVInt(0) // DonationsPerWeek
      this.writeVInt(0)

      this.writeVInt(1)
      this.writeVInt(0)
      this.writeVInt(57)

      this.writeVInt(location) // Region
      this.writeVInt(0)

      this.writeString(clanDesc) // Description
    }

    // AllianceMemberEntry
    {
      this.writeByte(memberCount) // MemberCount

      const allianceMembers = [...members].sort((a, b) => (b.trophies || 0) - (a.trophies || 0))
      allianceMembers.forEach((member, index) => {
        this.writeLong(member.highID, member.lowID) // ID
        this.writeString(member.name || '') // Name

        // Arena
        this.writeVInt(member.arena || 0)
        this.writeVInt(member.arena || 0)

        this.writeVInt(member.role) // Role (1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader)
        this.writeVInt(member.level) // Level
        this.writeVInt(member.trophies) // Trophies

        this.writeVInt(member.donated || 0) // Donated
        this.writeVInt(member.donationsReceived || 0) // DonationsReceived

        this.writeVInt(index + 1) // CurrentRank
        this.writeVInt(index + 1) // PreviousRank (no rank history stored, so reuse current)

        this.writeVInt(0) // ChestCrowns
        this.writeBoolean(false) // Not in this Clan Chest
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(0)

        this.writeVInt(7)

        this.writeLong(member.highID, member.lowID)
      })
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