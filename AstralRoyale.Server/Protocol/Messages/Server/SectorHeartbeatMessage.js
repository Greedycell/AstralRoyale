const PiranhaMessage = require('../../PiranhaMessage')

class SectorHeartbeatMessage extends PiranhaMessage {
  constructor (client, turn, checksum, commands) {
    super()
    this.id = 21443
    this.client = client
    this.version = 1
    this.turn = turn
    this.checksum = checksum
    this.commands = commands || []
  }

  async encode () {
    this.writeVInt(this.turn) // turn
    this.writeVInt(this.checksum) // checksum

    this.writeVInt(this.commands.length) // commandcount
    for (let command of this.commands) {
      if (!command) continue
      this.writeVInt(command.type || 0)
      switch (command.type) {
        case 1:
          this.writeVInt(command.tick || 0)
          this.writeVInt(command.tick || 0)

          this.writeVInt(command.userId && command.userId.high ? command.userId.high : 0)
          this.writeVInt(command.userId && command.userId.low ? command.userId.low : 0)

          this.writeVInt(command.deckIndex || 0)
          this.writeVInt(command.card && command.card.high ? command.card.high : 0)
          this.writeVInt(command.card && command.card.low ? command.card.low : 0)

          this.writeVInt(command.spellIndex || 0) // CardID
          this.writeVInt(command.card && command.card.level ? command.card.level : 0)
          this.writeVInt(command.coords && command.coords.x ? command.coords.x : 0)
          this.writeVInt(command.coords && command.coords.y ? command.coords.y : 0)
      }
    }
  }
}

module.exports = SectorHeartbeatMessage