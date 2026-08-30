const PiranhaMessage = require('../../PiranhaMessage')
const FriendsListMessage = require('../Server/FriendsListMessage')
const AvatarOnlineStatusUpdatedMessage = require('../Server/AvatarOnlineStatusUpdatedMessage')

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
    /*await new AvatarOnlineStatusUpdatedMessage(this.client, 0, 27, 3).send()
    await new AvatarOnlineStatusUpdatedMessage(this.client, 0, 28, 3).send()*/
  }
}

module.exports = AskForFriendListMessage