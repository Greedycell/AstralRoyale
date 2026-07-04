const PiranhaMessage = require('../../PiranhaMessage')
const cards = require('../../../Utils/json/battlecards')
const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

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
        command.tick = this.readVInt()
        command.checksum = this.readByte()
        command.userId = {
          high: this.readVInt(),
          low: this.readVInt(),
        }
        command.deckIndex = this.readByte() // CardSlot
        command.card = {
          high: this.readByte(),
          low: this.readVInt(),
        } // SCID
        command.card.id = cards.scid[command.card.high * 1000000 + command.card.low].id
        command.spellIndex = this.readByte()
        command.card.level = this.readByte()
        command.coords = {
          x: this.readVInt(),
          y: this.readVInt(),
        }
        command.deb = cards.scid[command.card.high * 1000000 + command.card.low].name
        this.data.commands.push(command)
      } catch (e) {
        console.log(e)
      }
    }

    console.log(this.data)
  }

  async process () {
    if (this.client.battle !== null) {
      this.client.battle.battleLastCommandTime = Date.now()
    }
    
    if (this.data.commands !== null) {
      for (let command of this.data.commands) {
        if (command.type === 1) {
          this.client.battle.commands.push(command)
        }
      }
    }

    await new AvailableServerCommandMessage(self.client, 51, this.data).send()
  }
}

module.exports = SectorCommandMessage