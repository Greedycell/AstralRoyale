class LogicJoinAllianceCommand {
  constructor() {}

  async encode (self) {
    self.writeLong(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID) // AllianceHighID, AllianceLowID
    self.writeString(self.client.player.clan.ClanName)

    self.writeVInt(16)
    self.writeVInt(self.client.player.clan.ClanBadge)

    self.writeVInt(0)
    self.writeVInt(2)

    self.writeVInt(0x7F)
    self.writeVInt(0x7F)

    self.writeVInt(0)
    self.writeVInt(0)
  }
}

module.exports = LogicJoinAllianceCommand