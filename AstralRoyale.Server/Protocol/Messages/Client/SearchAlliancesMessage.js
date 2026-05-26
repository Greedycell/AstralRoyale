const PiranhaMessage = require('../../PiranhaMessage')
const cardUtils = require('../../../Utils/cardUtils')
const utils = require('../../../Utils')
const Cards = require('../../../Utils/json/cards.json')
const LoginFailedMessage = require('../Server/LoginFailedMessage')
const AllianceListMessage = require('../Server/AllianceListMessage')

const RarityMaxLevel = {
  common: 12, // 13
  rare: 10, // 11
  epic: 7, // 8
  legendary: 4 // 5
}

function GetCardDataByID(id) {
  const realID = 26000000 + (id - 1)
  return Cards.find(c => c.id === realID)
}

function GetMaxLevel(id) {
  const data = GetCardDataByID(id)
  if (!data) {
    return 12
  }
  return RarityMaxLevel[data.rarity.toLowerCase()] ?? 12
}

const AllCardIDS = Cards.map(c => c.id)

class SearchAlliancesMessage extends PiranhaMessage {
  constructor(bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10949
    this.version = 1
  }

  async decode() {
    this.data = {}

    this.data.ClanString = this.readString()

    //console.log(this.data)
  }

  async process() {
    if (this.data.ClanString?.startsWith('/')) {
      const args = this.data.ClanString.slice(1).trim().split(/\s+/)
      const command = args.shift()?.toLowerCase()
      const player = this.client.player

      switch (command) {
        // max all cards
        case 'max': {
          for (const card of player.cards) {
            const maxLevel = GetMaxLevel(card.ID)
            card.level = maxLevel
            card.xpPoints = 0
          }

          player.level = 13
          player.xpPoints = 0

          player.markModified('cards')
          player.markModified('level')
          player.markModified('xpPoints')
          await player.save()
          
          await new LoginFailedMessage(this.client, 3, "Maxed out all cards!").send()
          break
        }

        // unlock all cards
        case 'unlock': {
          let cardsCount = utils.randomInt(1, 94)
          let cards = cardUtils.getCards(cardsCount)
          cards.forEach(card => {
            let cardCount = utils.randomInt(0, 94)
            this.writeVInt(cardsCount - cards.indexOf(card)) // CardIndex
            this.writeVInt(cardUtils.SCIDtoInstanceID(card.id))

            this.writeVInt(this.client.player.highID)
            this.writeVInt(this.client.player.lowID)
            this.writeVInt(cardCount) //CardCount
            this.writeVInt(0)
            this.writeVInt(0)
            this.writeByte(127)

            cardUtils.addCardPointsBySCID(this.client, card.id, cardCount)
          })
          
          await new LoginFailedMessage(this.client, 3, "Unlocked all cards!").send()
          break
        }

        // select 
        case 'trophies': {
          const amount = parseInt(args[0], 10)

          //console.log(amount)

          if (isNaN(amount)) {
            break
          }

          player.trophies = amount
          player.markModified('trophies')
          await player.save()
          
          await new LoginFailedMessage(this.client, 3, `Selected trophy amount ${amount}!`).send()
          break
        }
      }
    }
    else {
      await new AllianceListMessage(this.client, this.ClanString).send()
    }
  }
}

module.exports = SearchAlliancesMessage