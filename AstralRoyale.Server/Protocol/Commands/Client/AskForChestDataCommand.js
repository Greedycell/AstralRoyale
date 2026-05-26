class AskForChestDataCommand {
  constructor() {}

  async decode (self) {
    this.data = {}

    this.data.StartTick = self.readVInt()
    this.data.EndTick = self.readVInt()
    this.data.AccountHighID = self.readVInt()
    this.data.AccountLowID = self.readVInt()

    //console.log(this.data)
  }

  async process (self) {}
}

module.exports = AskForChestDataCommand