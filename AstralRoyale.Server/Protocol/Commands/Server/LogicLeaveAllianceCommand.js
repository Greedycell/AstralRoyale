class LogicLeaveAllianceCommand {
  constructor() {}

  async encode (self) {
    self.writeLong(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID) // AllianceHighID, AllianceLowID
    self.writeBoolean(false) // IsKick
    self.writeBoolean(true) // !IsKick
    self.writeByte(0x7F)
    self.writeByte(0x7F)
    self.writeByte(0)
    self.writeByte(0)
  }
}

module.exports = LogicLeaveAllianceCommand