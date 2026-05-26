const cardUtils = require('../../../Utils/cardUtils')
const utils = require('../../../Utils')
const { id } = require('../../../Utils/json/cards')

class UpgradeCardCommand {
  constructor() {}

  async decode (self) {
    this.data = {}

    this.data.StartTick = self.readVInt()
    this.data.EndTick = self.readVInt()
    this.data.AccountHighID = self.readVInt()
    this.data.AccountLowID = self.readVInt()
    this.data.CardType = self.readVInt()
    this.data.CardID = self.readVInt()

    //console.log(this.data)
  }

  async process (self) {
    //try {
      let id = cardUtils.SCIDtoInstanceID(this.data.CardType * 1000000 + this.data.CardID)
      let cardIndex = self.client.player.cards.indexOf(utils.findObjectByKey(self.client.player.cards, 'ID', id))
      let card = self.client.player.cards[cardIndex]
      card.level += 1
      self.client.player.cards[cardIndex] = card
      self.client.player.markModified('cards')
      self.client.player.save()
    //}
    //catch (e) {}
  }
}

module.exports = UpgradeCardCommand