const PiranhaMessage = require('../../PiranhaMessage')

class AllianceFullEntryUpdateMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24430
    this.client = client
    this.version = 1
  }

  async encode () {
    const db = this.client.mongoose
    const clan = await db.getClanByID(this.highID, this.lowID)
    const clanHighID = clan ? clan.highID : this.highID
    const clanLowID = clan ? clan.lowID : this.lowID
    const clanName = clan ? clan.name : 'Clashers'
    const clanBadge = clan ? clan.badge : 1
    const clanType = clan ? clan.type : 0
    const clanDesc = clan ? clan.description : ''
    const clanScore = clan ? clan.trophies : 0
    const clanReqScore = clan ? clan.requiredTrophies : 0
    const members = clan ? clan.members : []
    const memberCount = members.length || 0
    const location = clan ? clan.location : 0

    this.writeString(clanName)
    this.writeVInt(clanBadge)
    this.writeVInt(clanBadge)

    //if () {
      this.writeBoolean(true)
      this.writeLong(clanHighID, clanLowID)
    /*} else {
      this.writeBoolean(false)
    }*/
  }
}

module.exports = AllianceFullEntryUpdateMessage