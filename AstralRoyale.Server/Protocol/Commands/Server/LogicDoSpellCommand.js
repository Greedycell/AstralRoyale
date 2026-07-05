class LogicDoSpellCommand {
  constructor() {}

  async decode (self) {
    this.data = {}

    // Header
    {
        this.data.ClientTick = self.readVInt()
        this.data.Checksum = self.readVInt()

        this.data.SenderHighId = self.readVInt()
        this.data.SenderLowId = self.readVInt()
    }

    this.data.SpellDeckIndex = self.readVInt()

    this.data.ClassId = self.readVInt()
    this.data.InstanceId = self.readVInt()

    this.data.SpellIndex = self.readVInt()

    this.data.TroopLevel = self.readVInt()

    this.data.X = self.readVInt()
    this.data.Y = self.readVInt()

    //console.log(this.data)
  }

  async encode (self) {
    // Header
    {
        self.writeVInt(self.client.battle.commands.type)

        self.writeVInt(self.client.battle.commands.tick)
        self.writeVInt(self.client.battle.commands.checksum)

        self.writeVInt(self.client.battle.commands.userId.high)
        self.writeVInt(self.client.battle.commands.userId.low)
    }

    self.writeVInt(self.client.battle.commands.deckIndex)

    self.writeVInt(self.data.card.high)
    self.writeVInt(self.client.battle.commands.card.id)

    self.writeVInt(self.client.battle.commands.spellIndex)
  }

  async process (self) {
    // Header
    {
        self.writeVInt(self.client.battle.commands.type)

        self.writeVInt(self.client.battle.commands.tick)
        self.writeVInt(self.client.battle.commands.checksum)

        self.writeVInt(self.client.battle.commands.userId.high)
        self.writeVInt(self.client.battle.commands.userId.low)
    }

    self.writeVInt(self.client.battle.commands.deckIndex)

    self.writeVInt(self.data.card.high)
    self.writeVInt(self.client.battle.commands.card.id)

    self.writeVInt(self.client.battle.commands.spellIndex)
  }
}

module.exports = LogicDoSpellCommand