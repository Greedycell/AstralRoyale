const PiranhaMessage = require('../../PiranhaMessage')
const JoinableGameRoomsMessage = require('../Server/JoinableGameRoomsMessage')

class AskForJoinableGameRoomsMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15689
    this.version = 1
  }

  async decode () {}

  async process () {
    await new JoinableGameRoomsMessage(this.client, '').send()
  }
}

module.exports = AskForJoinableGameRoomsMessage