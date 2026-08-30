class ClientAvatar {
  async encode (self) {
    self.writeLogicLong(self.client.player.highID, self.client.player.lowID) // HighID, LowID
    self.writeLogicLong(self.client.player.highID, self.client.player.lowID) // HighID, LowID
    self.writeLogicLong(self.client.player.highID, self.client.player.lowID) // HighID, LowID
    self.writeString(self.client.player.name) // Name
    self.writeBoolean(self.client.player.nameChangesCount > 1)
    self.writeVInt(self.client.player.arena + 1) // Arena
    self.writeVInt(self.client.player.trophies) // Trophies

    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)

    self.writeVInt(41)

    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)

    self.writeVInt(8) //Resources Prefix???
    // Arrays
    self.writeVInt(1) //Resources Count
    self.writeVInt(5)//SCID Resource Type (Resources)
    self.writeVInt(1)//SCID Resource ID (Gold)
    self.writeVInt(self.client.player.gold) // Gold
    // End of Arrays

    self.writeVInt(0)
    self.writeVInt(6)
    self.writeVInt(60)

    self.writeVInt(7)
    self.writeVInt(9)
    self.writeVInt(60)

    self.writeVInt(8)
    self.writeVInt(9)
    self.writeVInt(60)

    self.writeVInt(9)
    self.writeVInt(9)
    self.writeVInt(60)

    self.writeVInt(4)
    self.writeVInt(1)
    self.writeVInt(60)

    self.writeVInt(5)
    self.writeVInt(1)
    self.writeVInt(60)

    self.writeVInt(6)
    self.writeVInt(1)
    self.writeVInt(0)

    self.writeVInt(6)
    self.writeVInt(5)
    self.writeVInt(11)
    self.writeVInt(41)
    self.writeVInt(5)
    self.writeVInt(8)
    self.writeVInt(9)
    self.writeVInt(5)
    self.writeVInt(27)
    self.writeVInt(1)
    self.writeVInt(5)
    self.writeVInt(7)
    self.writeVInt(1)
    self.writeVInt(5)
    self.writeVInt(6)
    self.writeVInt(30)
    self.writeVInt(5)

    self.writeVInt(9)
    self.writeVInt(26000000) // Favourite Card

    self.writeVInt(9)
    self.writeVInt(26)
    self.writeVInt(3)

    self.writeVInt(0)
    self.writeVInt(26)
    self.writeVInt(1)

    self.writeVInt(0)
    self.writeVInt(26)
    self.writeVInt(13)

    self.writeVInt(0)
    self.writeVInt(26)
    self.writeVInt(0)

    self.writeVInt(0)
    self.writeVInt(28)
    self.writeVInt(1)

    self.writeVInt(0)
    self.writeVInt(28)
    self.writeVInt(0)

    self.writeVInt(0)
    self.writeVInt(26)
    self.writeVInt(12)

    self.writeVInt(0)
    self.writeVInt(26)
    self.writeVInt(18)

    self.writeVInt(0)
    self.writeVInt(26)
    self.writeVInt(14)


    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(self.client.player.diamonds)//Diamonds
    self.writeVInt(self.client.player.diamonds)//Free Diamonds

    self.writeVInt(self.client.player.xpPoints)//XPlevel
    self.writeVInt(self.client.player.level)//Level
    self.writeVInt(self.client.player.nameChangesCount) // NameSet

    // 7 = Name already set + no clan
    // 8 = Set name popup + clan
    // 9 = Name already set + clan
    // < 7 =  Set name popup
    if (self.client.player.inClan)
    {
        let clan = null
        if (self.client && self.client.mongoose && typeof self.client.mongoose.getClanByID === 'function') {
          try {
            clan = await self.client.mongoose.getClanByID(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID)
          } catch (e) {
            console.error(e)
            clan = null
          }
        }

        self.writeByte(9)
        self.writeLogicLong(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID)
        self.writeString(clan ? String(clan.name || '') : '')
        self.writeVInt(clan.badge + 1)
        self.writeVInt(self.client.player.clan.ClanRole) // 1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader
    }
    else
    { 
      //console.log('NameSet:', self.client.player.nameChangesCount)
      if (self.client.player.nameChangesCount === 0) {
        self.writeByte(0)
      }
      else {
        self.writeByte(7)
      }
    }

    self.writeVInt(0) // Games Played
    self.writeVInt(0) // Matched Played -> Tournament Stats
    self.writeVInt(0) // Unknown
    self.writeVInt(0) // Win
    self.writeVInt(0) // Loses
    self.writeVInt(0) // Win Streak
    self.writeVInt(7/*self.client.player.tutorialStage*/) // Tutorial (1-7)
    self.writeVInt(0) // Tournament? (bool)
    self.writeVInt(0)
    self.writeVInt(0)
    //if (self.client.player.tutorialCompleted) {
      self.writeVInt(1) // Three Crown Win
    /*}
    else {
      self.writeVInt(0) // Three Crown Win
    }*/
    self.writeVInt(0)
    self.writeVInt(Date.now() / 1000 | 0)
    self.writeVInt(Date.now() / 1000 | 0)
    self.writeVInt(0)
  }
}

module.exports = ClientAvatar