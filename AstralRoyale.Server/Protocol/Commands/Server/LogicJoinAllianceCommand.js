class LogicJoinAllianceCommand {
  constructor() {}

  async encode (self) {
    const db = self.client.mongoose
    const clan = await db.getClanByID(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID)

    self.writeLong(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID) // AllianceHighID, AllianceLowID
    self.writeString(clan ? clan.name : '')

    self.writeVInt(16)
    self.writeVInt(clan ? clan.badge : 0)

    self.writeVInt(0)
    self.writeVInt(2)

    self.writeVInt(0x7F)
    self.writeVInt(0x7F)

    self.writeVInt(0)
    self.writeVInt(0)
  }
}

module.exports = LogicJoinAllianceCommand