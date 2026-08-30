const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')
const cardUtils = require('../../../Utils/cardUtils')

const shopCardOffers = {
  1: { scid: 26000000, count: 5 },
  2: { scid: 28000000, count: 1 }
}

class LogicBuyShopCycleItemCommand {
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
    if (this.data.ItemIndex === 0) {
      switch (this.data.ChestID) {
        /*case 447: { // Draft
          const chestData = {
            Chest: 'DraftChest',
            ChestIndex: this.data.ItemIndex,
            IsDraft: 1
          }

          await new AvailableServerCommandMessage(self.client, 393, chestData).send()
          return        
        }*/
        default: {
          const chestData = {
            Chest: 'CrownChest',
            ChestIndex: this.data.ItemIndex,
            IsDraft: 0
          }

          await new AvailableServerCommandMessage(self.client, 393, chestData).send()
          return
        }
      }
    }

    const offer = shopCardOffers[this.data.ItemIndex]
    if (!offer) return

    await cardUtils.addCardPointsBySCID(self.client, offer.scid, offer.count)
  }
}

module.exports = LogicBuyShopCycleItemCommand