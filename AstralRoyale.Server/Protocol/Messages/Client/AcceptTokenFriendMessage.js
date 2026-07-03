const PiranhaMessage = require('../../PiranhaMessage')
const FriendListUpdateMessage = require('../Server/FriendListUpdateMessage')

class AcceptTokenFriendMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 13922
    this.version = 1
  }

  async decode() {
    this.data = {}

    const raw = this.readString()
    const match = raw.match(/[a-z]{3,}/)
    this.data.Token = (match ? match[0] : null)?.slice(0, 17)

    //console.log(this.data)
  }

  async process () {
    await new FriendListUpdateMessage(this.client).send()
  }
}

module.exports = AcceptTokenFriendMessage