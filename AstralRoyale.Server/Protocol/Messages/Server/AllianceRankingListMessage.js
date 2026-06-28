const PiranhaMessage = require('../../PiranhaMessage')

class AllianceRankingListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25105
    this.client = client
    this.version = 1
  }

  async encode () {
    /*const db = this.client.mongoose
    const clans = await db.getTopClans(200)

    this.writeVInt(clans.length) // ClanCount

    for (let i = 0; i < clans.length; i++) {
      const clan = clans[i]

      this.writeLogicLong(clan.highID, clan.lowID)
      this.writeString(clan.name)
      this.writeVInt(i + 1) // Rank
      this.writeVInt(clan.trophies || 0) // Score
      this.writeVInt(200)
      this.writeVInt(16)
      this.writeVInt(clan.badge - 1) // Badge
      this.writeVInt(57)
      this.writeVInt(6)
      this.writeVInt(clan.members.length) // MemberCount
    }*/

    this.count = 1

    this.writeVInt(this.count) // Player Count

    for (var i = 0; i < this.count; i++)
    {
      this.writeLogicLong(this.client.player.clan.HighID, this.client.player.clan.LowID)
      this.writeString(this.client.player.clan.ClanName)
      this.writeVInt(i + 1)
      this.writeVInt(0) // Score
      this.writeVInt(200)
      this.writeVInt(16)
      this.writeVInt(this.client.player.clan.ClanBadge)
      this.writeVInt(57)
      this.writeVInt(6)
      this.writeVInt(1)
    }
  }
}

module.exports = AllianceRankingListMessage