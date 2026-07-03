const cardUtils = require('../../../Utils/cardUtils')
const utils = require('../../../Utils')

class LogicSwapSpellsCommand {
  constructor() {}

  async decode (self) {
    this.data = {}

    this.data.StartTick = self.readVInt()
    this.data.EndTick = self.readVInt()
    this.data.AccountHighID = self.readVInt()
    this.data.AccountLowID = self.readVInt()
    this.data.CardIndex = self.readVInt()
    this.data.Slot = self.readVInt()
    this.data.Unknown = self.readVInt()

    //console.log(this.data)
  }

  async process (self) {
    try {
      if (!self.client.cardsOutOfDeck)
      {
        self.client.cardsOutOfDeck = []
        self.client.player.cards.forEach(card => {
          if (!self.client.player.decks[self.client.player.selectedDeck].includes(cardUtils.instanceIDtoSCID(card.ID))) {
            self.client.cardsOutOfDeck.push(card)
          }
        })
      }

      let oldDeckCard = utils.findObjectByKey(self.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(self.client.player.decks[self.client.player.selectedDeck][this.data.Slot]))
      
      //console.log(self.client.player.decks[self.client.player.selectedDeck][this.data.Slot])
      let selectedDeck = self.client.player.decks[self.client.player.selectedDeck]
      let newDeckCardSCID = cardUtils.instanceIDtoSCID(self.client.cardsOutOfDeck[this.data.CardIndex].ID)
      
      selectedDeck[this.data.Slot] = newDeckCardSCID
      self.client.player.decks[self.client.player.selectedDeck] = selectedDeck
      self.client.cardsOutOfDeck[this.data.CardIndex] = oldDeckCard
      self.client.player.markModified('decks')
      await self.client.player.save()
    }
    catch (e) {}
  }
}

module.exports = LogicSwapSpellsCommand