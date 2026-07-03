const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class OpenFreeChestCommand {
  constructor() {}

  async decode (self) {
    this.data = {}

    this.data.StartTick = self.readVInt()
    this.data.EndTick = self.readVInt()
    this.data.AccountHighID = self.readVInt()
    this.data.AccountLowID = self.readVInt()
    this.data.Gold = self.readVInt()

    //console.log(this.data)
  }

  async process (self) {
    this.chestData = {}
    this.chestData.Chest = 'FreeChest'

    await new AvailableServerCommandMessage(self.client, 393, this.chestData).send()
  }
}

module.exports = OpenFreeChestCommand