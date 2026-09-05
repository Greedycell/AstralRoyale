const PiranhaMessage = require('../../PiranhaMessage')
const FriendsListMessage = require('../Server/FriendsListMessage')

class AskForPlayingGamecenterFriendsMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 19212
    this.version = 26
  }

  async decode () {}

  async process () {
    await new FriendsListMessage(this.client, 2).send()
    await FriendsListMessage.checkStatus(this.client)
  }
}

module.exports = AskForPlayingGamecenterFriendsMessage