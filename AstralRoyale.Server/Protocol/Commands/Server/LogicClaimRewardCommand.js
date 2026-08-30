const cardUtils = require('../../../Utils/cardUtils')
const utils = require('../../../Utils')

class LogicClaimRewardCommand {
  constructor() {}

  async encode (self) {
    switch (self.data.Chest) {
      case 'FreeChest': {
        self.writeVInt(1)
        self.writeVInt(self.data.IsDraft) // IsDraft

        let cardsCount = utils.randomInt(1, 7)
        let cards = cardUtils.getCards(cardsCount)
        cards.forEach(card => {
          let cardCount = utils.randomInt(0, 200)
          self.writeVInt(cardsCount - cards.indexOf(card)) // CardIndex
          self.writeVInt(cardUtils.SCIDtoInstanceID(card.id))

          self.writeVInt(self.client.player.highID)
          self.writeVInt(self.client.player.lowID)
          self.writeVInt(cardCount) // CardCount
          self.writeVInt(0)
          self.writeVInt(0)
          self.writeByte(127)

          cardUtils.addCardPointsBySCID(self.client, card.id, cardCount)
        })
        self.writeVInt(2)
        self.writeByte(127)
        self.writeVInt(utils.randomInt(10, 100))
        self.writeVInt(utils.randomInt(10, 300))
        self.writeVInt(6000) // ChestSlot

        self.writeVInt(14)
        self.writeVInt(1)
        self.writeByte(127)
        self.writeByte(127)
        self.writeVInt(0)
        self.writeVInt(0)
      }
      case 'CrownChest': {
        self.writeVInt(1)
        self.writeVInt(self.data.IsDraft) // IsDraft

        let cardsCount = utils.randomInt(1, 7)
        let cards = cardUtils.getCards(cardsCount)
        cards.forEach(card => {
          let cardCount = utils.randomInt(0, 200)
          self.writeVInt(cardsCount - cards.indexOf(card)) // CardIndex
          self.writeVInt(cardUtils.SCIDtoInstanceID(card.id))

          self.writeVInt(self.client.player.highID)
          self.writeVInt(self.client.player.lowID)
          self.writeVInt(cardCount) // CardCount
          self.writeVInt(0)
          self.writeVInt(0)
          self.writeByte(127)

          cardUtils.addCardPointsBySCID(self.client, card.id, cardCount)
        })
        self.writeVInt(2)
        self.writeByte(127)
        self.writeVInt(utils.randomInt(10, 100))
        self.writeVInt(utils.randomInt(10, 300))
        self.writeVInt(6000) // ChestSlot

        self.writeVInt(14)
        self.writeVInt(1)
        self.writeByte(127)
        self.writeByte(127)
        self.writeVInt(0)

        try {
          if (self.client.player.crownChestCount >= 10) {
            self.client.player.crownChestCount -= 10
            self.client.player.markModified('crownChestCount')
            await self.client.player.save()
          }
        }
        catch (e) {}
      }
      case 'DraftChest': {
        self.writeVInt(1)
        self.writeVInt(self.data.IsDraft) // IsDraft

        let cardsCount = utils.randomInt(1, 7)
        let cards = cardUtils.getCards(cardsCount)
        cards.forEach(card => {
          let cardCount = utils.randomInt(0, 200)
          self.writeVInt(cardsCount - cards.indexOf(card)) // CardIndex
          self.writeVInt(cardUtils.SCIDtoInstanceID(card.id))

          self.writeVInt(self.client.player.highID)
          self.writeVInt(self.client.player.lowID)
          self.writeVInt(cardCount) // CardCount
          self.writeVInt(0)
          self.writeVInt(0)
          self.writeByte(127)

          cardUtils.addCardPointsBySCID(self.client, card.id, cardCount)
        })
        self.writeVInt(2)
        self.writeByte(127)
        self.writeVInt(utils.randomInt(10, 100))
        self.writeVInt(utils.randomInt(10, 300))
        self.writeVInt(6000) // ChestSlot

        self.writeVInt(14)
        self.writeVInt(1)
        self.writeByte(127)
        self.writeByte(127)
        self.writeVInt(0)

        try {
          if (self.client.player.crownChestCount >= 10) {
            self.client.player.crownChestCount -= 10
            self.client.player.markModified('crownChestCount')
            await self.client.player.save()
          }
        }
        catch (e) {}
      }
    }
  }
}

module.exports = LogicClaimRewardCommand