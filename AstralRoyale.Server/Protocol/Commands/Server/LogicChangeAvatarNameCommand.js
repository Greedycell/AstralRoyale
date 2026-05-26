class LogicChangeAvatarNameCommand {
  constructor() {}

  async encode (self) {
    self.writeString(self.client.player.name) // Name
    self.writeInt(self.client.player.nameChangesCount) // NameSet
    self.writeBoolean(true) // NameSetByUser
    //console.log(self.client.player.name, self.client.player.nameChangesCount)
  }
}

module.exports = LogicChangeAvatarNameCommand