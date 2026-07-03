const PiranhaMessage = require('../../PiranhaMessage')

class PvpMatchmakeNotificationMessage extends PiranhaMessage {
  constructor (client, levelIndex) {
    super()
    this.id = 27552
    this.client = client
    this.version = 1
    this.levelIndex = levelIndex
  }

  async encode () {
    this.writeVInt(levelIndex) // LevelIndex
  }
}

module.exports = PvpMatchmakeNotificationMessage