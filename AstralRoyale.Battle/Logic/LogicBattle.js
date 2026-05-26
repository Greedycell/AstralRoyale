const SectorHeartbeatMessage = require('../Protocol/Messages/Server/SectorHeartbeatMessage')
const BattleResultMessage = require('../../AstralRoyale.Server/Protocol/Messages/Server/BattleResultMessage')

class LogicBattle {
  constructor() {}

  start(seconds, player1, player2) {
    if (this.interval) return

    this.time = seconds
    this.turn = 0
    let tickCount = 0

    this.interval = setInterval(() => {
      this.turn++
      tickCount++

      //if (tickCount % 20 === 0) {
        this.time--
      //}

      console.log('Battle seconds', this.time)

      player1.tick = tickCount
      player2.tick = tickCount

      new SectorHeartbeatMessage(player1, this.turn, 0, 0).send()
      new SectorHeartbeatMessage(player2, this.turn, 0, 0).sendOpponent(player2)

      if (this.time <= 13) {
        new BattleResultMessage(player1, 1, player2).send()
        new BattleResultMessage(player2, 1, player1).sendOpponent(player2)
        clearInterval(this.interval)
        this.interval = null
      }
    }, 500)
  }

  getTime() {
    return this.time
  }
}

module.exports = LogicBattle