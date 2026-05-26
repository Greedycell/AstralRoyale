const PiranhaMessage = require('../../PiranhaMessage')

class AllianceRankingListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 25105
    this.client = client
    this.version = 1
  }

  async encode () {
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
      this.writeVInt(this.client.player.clan.ClanBadge - 1)
      this.writeVInt(57)
      this.writeVInt(6)
      this.writeVInt(1)
    }
  }
}

module.exports = AllianceRankingListMessage