class LogicAllianceSettingsChangedCommand {
  constructor() {}

  async encode (self) {
    const db = self.client.mongoose
    const clan = await db.getClanByID(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID)

    self.writeLong(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID)

    self.writeVInt(16)
    self.writeVInt(clan ? clan.badge : 1)
  }
}

module.exports = LogicAllianceSettingsChangedCommand