const PiranhaMessage = require('../../PiranhaMessage')
const cards = require('../../../Utils/json/battlecards')
const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')
const OutOfSyncMessage = require('../../Messages/Server/OutOfSyncMessage')

class SectorCommandMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10541
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.readVInt()
    this.data.tick = this.readVInt() // Tick
    if (this.data.tick <= 0) {
      this.client.end()
    }
    this.data.commandCount = this.readByte()
    this.data.commands = []
    for (let i = 0; i < this.data.commandCount; i++) {
      try {
        let command = {}
        command.type = this.readByte()
        if (command.type === undefined) { // if the fucking client just fucks up vals for no reason
          await new OutOfSyncMessage(self.client).send()
          return
        }
        command.tick = this.readVInt()
        command.checksum = this.readByte()
        command.userId = []
        command.userId.high = this.readVInt()
        command.userId.low = this.readVInt()
        command.deckIndex = this.readByte() // CardSlot
        command.card = [] // SCID
        command.card.high = this.readByte()
        command.card.low = this.readVInt()
        const cardEntry = cards.scid?.[command.card.high * 1000000 + command.card.low] ?? {}
        command.card.id = cardEntry.id
        command.spellIndex = this.readByte()
        command.card.level = this.readByte()
        command.coords = []
        command.coords.x = this.readVInt()
        command.coords.y = this.readVInt()
        command.deb = cardEntry.name
        this.data.commands.push(command)
      } catch (e) {
        console.log(e)
      }
    }

    //console.log(this.data)
  }

  async process () {
    if (this.client.battle !== null) {
      this.client.battle.battleLastCommandTime = Date.now()
    }
    if (this.data.commands !== null) {
      for (let command of this.data.commands) {
        if (command.type === 51) {
          this.client.battle.commands.push(command)
          //await new AvailableServerCommandMessage(this.client, 51, this.data).send()
        }
      }
    }
  }
}

module.exports = SectorCommandMessage