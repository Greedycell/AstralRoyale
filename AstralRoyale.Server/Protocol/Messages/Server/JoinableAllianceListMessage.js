const PiranhaMessage = require('../../PiranhaMessage')

class JoinableAllianceListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25445
    this.client = client
    this.version = 1
  }

  async encode () {
    const db = this.client.mongoose
    //const clans = await db.getJoinableClans(20) // TODO: Joinable clans
    const clans = await db.searchClans('', 20)

    this.writeVInt(clans.length) // AlliancesCount

    for (const clan of clans) {
      this.writeLong(clan.highID, clan.lowID) // HighID, LowID
      this.writeString(clan.name) // Name
      this.writeVInt(16) // BadgeType
      this.writeVInt(clan.badge) // BadgeInstance
      this.writeVInt(clan.type || 0) // Type
      this.writeVInt(clan.members?.length || 0) // MemberCount
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
      this.writeVInt(57)

      this.writeVInt(6)
      this.writeVInt(0)
    }
  }
}

module.exports = JoinableAllianceListMessage