const PiranhaMessage = require('../../PiranhaMessage')
const FriendsInviteDataMessage = require('../Server/FriendsInviteDataMessage')

class AskForFriendsInviteMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15793
    this.version = 1
  }

  async decode () {}

  async process () {
    await new FriendsInviteDataMessage(this.client).send()
  }
}

module.exports = AskForFriendsInviteMessage