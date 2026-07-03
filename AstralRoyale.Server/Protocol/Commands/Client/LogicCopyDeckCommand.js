class LogicCopyDeckCommand {
  constructor() {}

  async decode (self) {
    this.data = {}

    this.data.Unknown1 = self.readVInt()
    this.data.Unknown2 = self.readVInt()
    this.data.Unknown3 = self.readVInt()
    this.data.Unknown4 = self.readVInt()
    this.data.DeckIndex = self.readVInt()
    this.data.Unknown5 = self.readVInt()
    this.data.Card1 = self.readVInt()
    this.data.Card2 = self.readVInt()
    this.data.Card3 = self.readVInt()
    this.data.Card4 = self.readVInt()
    this.data.Card5 = self.readVInt()
    this.data.Card6 = self.readVInt()
    this.data.Card7 = self.readVInt()
    this.data.Card8 = self.readVInt()

    //console.log(this.data)
  }

  async process (self) {
    try {
      const deck = [
        this.data.Card1,
        this.data.Card2,
        this.data.Card3,
        this.data.Card4,
        this.data.Card5,
        this.data.Card6,
        this.data.Card7,
        this.data.Card8
      ]

      self.client.player.decks[this.data.DeckIndex] = deck
      self.client.player.markModified('decks')
      await self.client.player.save()
    }
    catch (e) {}
  }
}

module.exports = LogicCopyDeckCommand