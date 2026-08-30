const PiranhaMessage = require('../../PiranhaMessage')

class BattleResultMessage extends PiranhaMessage {
  constructor (client, ownCrowns = 0, opponentCrowns = 0) {
    super()
    this.id = 28934
    this.client = client
    this.version = 1
    this.ownCrowns = ownCrowns
    this.opponentCrowns = opponentCrowns
  }

  async encode () {
    this.writeVInt(1) // 1 = Win, 2 = Lost, 3 = Draw
    this.writeVInt(30) // Trophies (Own)

    this.writeVInt(0)
    this.writeVInt(-30) // Trophies (Opponent)

    this.writeVInt(0)
    this.writeVInt(63)

    this.writeVInt(0)
    this.writeVInt(0)

    this.writeVInt(this.ownCrowns) // Crown(s) (Own)
    this.writeVInt(this.opponentCrowns) // Crown(s) (Opponent)

    this.writeVInt(19)
    this.writeVInt(225)
    this.writeVInt(0)
    this.writeVInt(0)
    this.writeVInt(4)
    this.writeVInt(47)
    this.writeVInt(1260)
    this.writeVInt(1293)
    this.writeVInt(11)
    this.writeVInt(1260)

    // Treasure Chest
    this.writeVInt(58)
    this.writeVInt(205)

    this.writeVInt(21)
    this.writeVInt(1)
  }
}

module.exports = BattleResultMessage