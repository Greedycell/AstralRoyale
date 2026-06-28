class LogicChangeAllianceRoleCommand {
  constructor() {}

  async encode (self) {
    self.writeLong(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID) // AllianceHighID, AllianceLowID
    self.writeVInt(self.client.player.clan.ClanRole)
  }
}

module.exports = LogicChangeAllianceRoleCommand