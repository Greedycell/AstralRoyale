const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicStartRewardClaimCommand {
  constructor() {}

  async decode (self) {
    this.data = {}

    this.data.StartTick = self.readVInt()
    this.data.EndTick = self.readVInt()
    this.data.AccountHighID = self.readVInt()
    this.data.AccountLowID = self.readVInt()
    this.data.ChestIndex = self.readVInt()

    //console.log(this.data)
  }

  async process (self) {
    this.chestData = {}
    this.chestData.Chest = 'CrownChest'
    this.chestData.ChestIndex = this.data.ChestIndex
    
    await new AvailableServerCommandMessage(self.client, 393, this.chestData).send()
  }
}

module.exports = LogicStartRewardClaimCommand