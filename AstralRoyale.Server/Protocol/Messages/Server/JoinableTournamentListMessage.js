const PiranhaMessage = require('../../PiranhaMessage')

class JoinableTournamentListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24304 // 26108
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeVInt(1) // Entries

    // AllianceHeaderEntry
    {
      this.writeLong(0, 1) // HighID, LowID
      this.writeString('Clashers') // Name
      this.writeVInt(0) // Badge
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

      this.writeVInt(1) // Locale
      this.writeVInt(1)
      this.writeVInt(1) // Region
      this.writeVInt(1)

      this.writeBoolean(false)

      if (false)
      {
          // TODO : Encode the clan event.
      }
    }
  }
}

module.exports = JoinableTournamentListMessage