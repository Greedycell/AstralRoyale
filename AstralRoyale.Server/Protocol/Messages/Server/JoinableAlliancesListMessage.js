const PiranhaMessage = require('../../PiranhaMessage')

class JoinableAlliancesListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24304
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeByte(1) // Alliances Count

    this.writeLong(this.client.player.clan.ClanHighID, this.client.player.clan.ClanLowID) // HighID, LowID
    this.writeString(this.client.player.clan.ClanName) // Name
    this.writeVInt(this.client.player.clan.ClanBadge) // Badge

    this.writeVInt(1) // Type
    this.writeVInt(1) // MemberCount
    this.writeVInt(6400) // Score
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

module.exports = JoinableAlliancesListMessage