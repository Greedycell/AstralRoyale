const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicCollectFreeChestCommand {
  constructor() {}

  async decode (self) {}

  async process (self) {
    this.chestData = {}
    this.chestData.Chest = 'FreeChest'

    await new AvailableServerCommandMessage(self.client, 393, this.chestData).send()
  }
}

module.exports = LogicCollectFreeChestCommand