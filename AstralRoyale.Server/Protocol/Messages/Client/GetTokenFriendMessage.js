const PiranhaMessage = require('../../PiranhaMessage')
const GetTokenFriendResultMessage = require('../Server/GetTokenFriendResultMessage')
const AddFriendFailedMessage = require('../Server/AddFriendFailedMessage')

class GetTokenFriendMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15793
    this.version = 1
  }

  async decode () {}

  async process () {
    await new GetTokenFriendResultMessage(this.client).send()
  }
}

module.exports = GetTokenFriendMessage