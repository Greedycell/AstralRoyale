const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class BuyShopItemCommand {
  constructor() {}

  async decode (self) {
    this.data = {}

    this.data.StartTick = self.readVInt()
    this.data.EndTick = self.readVInt()
    this.data.AccountHighID = self.readVInt()
    this.data.AccountLowID = self.readVInt()
    this.data.ItemIndex = self.readVInt()
    this.data.ChestID = self.readVInt()

    //console.log(this.data)
  }

  async process (self) {
    this.chestData = {}
    this.chestData.Chest = 'CrownChest'
    this.chestData.ChestIndex = this.data.ItemIndex
    
    await new AvailableServerCommandMessage(self.client, 393, this.chestData).send()
  }
}

module.exports = BuyShopItemCommand