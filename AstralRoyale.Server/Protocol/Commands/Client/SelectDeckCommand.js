class SelectDeckCommand {
  constructor() {}

  async decode (self) {
    this.data = {}

    this.data.StartTick = self.readVInt()
    this.data.EndTick = self.readVInt()
    this.data.AccountHighID = self.readVInt()
    this.data.AccountLowID = self.readVInt()
    this.data.DeckIndex = self.readVInt()

    //console.log(this.data)
  }

  async process (self) {
    try {
      self.client.player.selectedDeck = this.data.DeckIndex
      await self.client.player.save()
    }
    catch (e) {}
  }
}

module.exports = SelectDeckCommand