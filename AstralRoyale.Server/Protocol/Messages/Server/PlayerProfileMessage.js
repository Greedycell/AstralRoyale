const PiranhaMessage = require('../../PiranhaMessage')
const ClientAvatar = require('../../../Logic/ClientAvatar')

const cardUtils = require('../../../Utils/cardUtils')
const utils = require('../../../Utils')

class PlayerProfileMessage extends PiranhaMessage {
  constructor (client, HighID, LowID) {
    super()
    this.id = 25880
    this.client = client
    this.HighID = HighID
    this.LowID = LowID
    this.version = 1
  }

  async encode () {
    this.writeLogicLong(1, 0)

    this.writeBoolean(true)

    // Home
    {
      for (var i = 0; i < 8; i++)
      {
          this.writeBoolean(true)
      }
      
      let currentDeck = this.client.player.decks[this.client.player.selectedDeck]
      currentDeck.forEach(cardSCID => {
        let card = utils.findObjectByKey(this.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))
        this.writeVInt(card.ID)
        this.writeVInt(card.level)
        this.writeVInt(0)
        this.writeVInt(card.xpPoints)
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(0)
      })

      this.writeLong(this.client.player.highID, this.client.player.lowID)

      this.writeBoolean(true)
      this.writeLogicLong(this.client.player.highID, this.client.player.lowID)

      this.writeVInt(0)
    }

    this.writeBoolean(true)

    const avatar = new ClientAvatar()
    avatar.encode(this)

    this.writeBoolean(false)
  }
}

module.exports = PlayerProfileMessage