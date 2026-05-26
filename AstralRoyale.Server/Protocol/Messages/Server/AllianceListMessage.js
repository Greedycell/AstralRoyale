const PiranhaMessage = require('../../PiranhaMessage')

class AllianceListMessage extends PiranhaMessage {
  constructor (client, clanString) {
    super()
    this.id = 24310
    this.client = client
    this.version = 1
    this.clanString = clanString
  }

  async encode () {
    this.writeString(this.clanString) // SearchString
    this.writeVInt(1) // AllianceCount

    // AllianceHeaderEntry
    {
      this.writeLong(this.client.player.clan.ClanHighID, this.client.player.clan.ClanLowID)
      this.writeString(this.client.player.clan.ClanName)

      this.writeVInt(16) // BadgeType
      this.writeVInt(this.client.player.clan.Badge) // BadgeInstance

      this.writeVInt(1) // Type
      this.writeVInt(1) // MemberCount

      this.writeVInt(0) // Score
      this.writeVInt(0) // RequiredScore
      
      this.writeVInt(0)
      this.writeVInt(0)
      this.writeVInt(0)
      this.writeVInt(50)
      this.writeVInt(0) // Donations
      this.writeVInt(2)

      this.writeVInt(0) // Locale
      this.writeVInt(0) // Region

      this.writeBoolean(false)

      if (false)
      {
          // TODO: Encode the clan event
      }
    }
  }
}

module.exports = AllianceListMessage