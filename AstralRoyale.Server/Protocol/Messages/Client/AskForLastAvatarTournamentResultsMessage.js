const PiranhaMessage = require('../../PiranhaMessage')
const LastAvatarTournamentResultsMessage = require('../Server/LastAvatarTournamentResultsMessage')

class AskForLastAvatarTournamentResultsMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15359
    this.version = 1
  }

  async decode () {}

  async process () {
    await new LastAvatarTournamentResultsMessage(this.client).send()
  }
}

module.exports = AskForLastAvatarTournamentResultsMessage