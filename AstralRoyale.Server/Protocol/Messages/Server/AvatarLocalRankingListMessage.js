const PiranhaMessage = require('../../PiranhaMessage')

class AvatarLocalRankingListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25390
    this.client = client
    this.version = 1
  }

  async encode () {
    const db = this.client.mongoose
    const players = await db.getLocalPlayers(200)
    const clanCache = {}

    this.writeVInt(players.length) // PlayerCount
    for (var i = 0; i < players.length; i++)
    {
      const player = players[i]
      this.writeLogicLong(player.highID, player.lowID)
      this.writeString(player.name)
      this.writeVInt(i + 1)
      this.writeVInt(player.trophies)
      this.writeVInt(18)
      this.writeVInt(0)
      this.writeVInt(0)
      this.writeVInt(0)

      // RankingEntry
      this.writeVInt(player.level)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeString('DE')
      this.writeLong(player.highID, player.lowID)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)
      this.writeByte(0)

      if (player.inClan) {
        const clanKey = `${player.clan.ClanHighID}:${player.clan.ClanLowID}`
        let clan = clanCache[clanKey]
        if (clan === undefined) {
            clan = await db.getClanByID(player.clan.ClanHighID, player.clan.ClanLowID)
            clanCache[clanKey] = clan || null
        }
        if (clan) {
            this.writeBoolean(true)
            this.writeLong(clan.highID, clan.lowID)
            this.writeString(clan.name)
            this.writeByte(16)
            this.writeVInt(clan.badge)
        } else {
            this.writeBoolean(false)
        }
      } else {
          this.writeBoolean(false)
      }
      
      if (player.inClan) this.writeVInt(0)
    }
  }
}

module.exports = AvatarLocalRankingListMessage