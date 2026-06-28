const PiranhaMessage = require('../../PiranhaMessage')

class AvatarRankingListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 29733
    this.client = client
    this.version = 1
  }

  async encode () {
    this.count = 1

    this.writeVInt(this.count) // Player Count

    for (var i = 0; i < this.count; i++)
    {
        this.writeLogicLong(this.client.player.highID, this.client.player.lowID)
        this.writeString(this.client.player.name)
        this.writeVInt(i + 1)
        this.writeVInt(this.client.player.trophies)
        this.writeVInt(200)
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(0)

        // RankingEntry
        this.writeVInt(this.client.player.level)
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
        this.writeString("DE")
        this.writeLong(this.client.player.highID, this.client.player.lowID)
        this.writeByte(0)
        this.writeByte(0)
        this.writeByte(0)
        this.writeByte(0)
        this.writeByte(0)
        this.writeByte(0)
        this.writeByte(0)
        this.writeByte(0)
        if (this.client.player.inClan)
        {
            this.writeBoolean(true)
            this.writeLong(this.client.player.clan.HighID, this.client.player.clan.ClanLowID)
            this.writeString(this.client.player.clan.ClanName)
            this.writeByte(16)
            this.writeVInt(this.client.player.clan.ClanBadge)
        }
        this.writeVInt(0) // Has League
    }

    this.writeInt(0)
    this.writeInt(518400) // Seconds until next month
  }
}

module.exports = AvatarRankingListMessage