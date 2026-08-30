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

    const [highID, lowID] = this.readLong()
    this.data.FriendHighID = highID
    this.data.FriendLowID = lowID
    this.data.FriendToken = this.readString()

    //console.log(this.data)
  }

  async process () {
    const db = this.client.mongoose

    let targetPlayer = null
    if (this.data.FriendHighID !== undefined && this.data.FriendLowID !== undefined) {
      try {
        targetPlayer = await db.getPlayerByID(this.data.FriendHighID, this.data.FriendLowID)
      } catch (e) {
        console.error(e)
        targetPlayer = null
      }
    }
    if (this.data.FriendHighID !== this.client.player.highID && this.data.FriendLowID !== this.client.player.lowID) return // make sure the friend isnt u

    if (targetPlayer.friendToken === this.data.FriendToken && this.data.FriendToken !== '') { // make sure the tokens r matching and not blank
      await new FriendListUpdateMessage(this.client, targetPlayer).send()
    }
  }
}

module.exports = AcceptTokenFriendMessage