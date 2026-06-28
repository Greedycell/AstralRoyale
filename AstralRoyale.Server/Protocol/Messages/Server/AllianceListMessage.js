const PiranhaMessage = require('../../PiranhaMessage')

class AllianceListMessage extends PiranhaMessage {
  constructor (client, clanString) {
    super()
    this.id = 24310
    this.client = client
    this.version = 1
    this.clanString = clanString || ''
  }

  async encode () {
    const db = this.client.mongoose
    const clans = await db.searchClans(this.clanString, 20)

    this.writeString(this.clanString) // SearchString
    this.writeVInt(clans.length) // AllianceCount

    for (const clan of clans) {
      // AllianceHeaderEntry
      {
        this.writeLong(clan.highID, clan.lowID)
        this.writeString(clan.name)

        this.writeVInt(16) // BadgeType
        this.writeVInt(clan.badge || 1) // BadgeInstance

        this.writeVInt(clan.type || 0) // Type
        this.writeVInt(clan.members.length) // MemberCount

        this.writeVInt(clan.trophies || 0) // Score
        this.writeVInt(clan.requiredTrophies || 0) // RequiredScore
      }

      this.writeVInt(0)
      this.writeVInt(0)
      this.writeVInt(0)

      this.writeVInt(0)
      this.writeVInt(0)
      this.writeVInt(0)

      this.writeVInt(1)
      this.writeVInt(3) 
      this.writeVInt(57)

      this.writeVInt(6)
      this.writeVInt(0)
    }
  }
}

module.exports = AllianceListMessage