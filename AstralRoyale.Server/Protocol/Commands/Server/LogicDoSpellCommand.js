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
        self.writeVInt(this.data.Type)

        self.writeVInt(this.data.ClientTick)
        self.writeVInt(this.data.Checksum)

        self.writeVInt(this.data.SenderHighId)
        self.writeVInt(this.data.SenderLowId)
    }

    self.writeVInt(this.data.SpellDeckIndex)

    self.writeVInt(this.data.ClassId)
    self.writeVInt(this.data.InstanceId)

    self.writeVInt(this.data.SpellIndex)
  }

  async process (self) {
    // Header
    {
        self.writeVInt(this.data.Type)

        self.writeVInt(this.data.ClientTick)
        self.writeVInt(this.data.Checksum)

        self.writeVInt(this.data.SenderHighId)
        self.writeVInt(this.data.SenderLowId)
    }

    self.writeVInt(this.data.SpellDeckIndex)

    self.writeVInt(this.data.ClassId)
    self.writeVInt(this.data.InstanceId)

    self.writeVInt(this.data.SpellIndex)
  }
}

module.exports = LogicDoSpellCommand