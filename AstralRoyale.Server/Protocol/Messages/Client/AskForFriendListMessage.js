const PiranhaMessage = require('../../PiranhaMessage')
const FriendsListMessage = require('../Server/FriendsListMessage')

class AskForFriendListMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10370
    this.version = 1
  }

  async decode () {}

  async process () {
    await new FriendsListMessage(this.client, 0).send()
  }
}

module.exports = AskForFriendListMessage