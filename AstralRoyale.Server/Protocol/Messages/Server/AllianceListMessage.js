const PiranhaMessage = require('../../PiranhaMessage')

class AllianceListMessage extends PiranhaMessage {
  constructor (client, data) {
    super()
    this.id = 22534
    this.client = client
    this.version = 1
    this.data = data
    this.clanString = this.data.ClanString
    this.locationClassID = this.data.LocationClassID
    this.locationInstanceID = this.data.LocationInstanceID
    this.minimumMembers = this.data.MinimumMembers
    this.maximumMembers = this.data.MaximumMembers
    this.minimumRequiredTrophies = this.data.MinimumRequiredTrophies
    this.canJoin = this.data.CanJoin
  }

  async encode () {
    const db = this.client.mongoose
    const clans = await db.searchClans(this.clanString || '', 20, {
      locationInstanceID: this.locationInstanceID,
      minimumMembers: this.minimumMembers,
      maximumMembers: this.maximumMembers,
      minimumRequiredTrophies: this.minimumRequiredTrophies,
      canJoin: this.canJoin
    })

    this.writeString(this.clanString || '') // SearchString
    this.writeVInt(clans.length) // AllianceCount

    for (const clan of clans) {
      this.writeLong(clan.highID, clan.lowID) // HighID, LowID
      this.writeString(clan.name) // Name
      this.writeVInt(16) // BadgeType
      this.writeVInt((clan.badge || 1)) // BadgeInstance
      this.writeVInt(clan.type || 0) // Type
      this.writeVInt(clan.members.length) // MemberCount
      this.writeVInt(clan.trophies || 0) // Score
      this.writeVInt(clan.requiredTrophies || 0) // RequiredScore

      this.writeVInt(0)
      this.writeVInt(0)
      this.writeVInt(0)

      this.writeVInt(0)
      this.writeVInt(0)
      this.writeVInt(0)

      this.writeVInt(1)
      this.writeVInt(3)
      this.writeVInt(clan.location || 57)

      this.writeVInt(6)
      this.writeVInt(0)
    }
  }
}

module.exports = AllianceListMessage