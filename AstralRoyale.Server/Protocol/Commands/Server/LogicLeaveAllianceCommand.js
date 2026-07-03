class LogicLeaveAllianceCommand {
  constructor() {}

  async encode (self) {
    self.writeLong(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID) // AllianceHighID, AllianceLowID
    self.writeBoolean(false) // IsKick
    self.writeBoolean(true) // IsLeft

    self.writeByte(127)
    self.writeByte(127)
    
    self.writeByte(0)
    self.writeByte(0)
  }
}

module.exports = LogicLeaveAllianceCommand