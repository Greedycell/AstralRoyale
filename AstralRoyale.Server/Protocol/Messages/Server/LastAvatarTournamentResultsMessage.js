const PiranhaMessage = require('../../PiranhaMessage')

class LastAvatarTournamentResultsMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24316
    this.client = client
    this.version = 1
  }

  async encode () {}
}

module.exports = LastAvatarTournamentResultsMessage