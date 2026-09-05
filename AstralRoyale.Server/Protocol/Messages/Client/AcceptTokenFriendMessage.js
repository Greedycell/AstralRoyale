const PiranhaMessage = require('../../PiranhaMessage')
const FriendListUpdateMessage = require('../Server/FriendListUpdateMessage')
const FriendsListMessage = require('../Server/FriendsListMessage')

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
    if (!targetPlayer) return
    if (this.data.FriendHighID === this.client.player.highID && this.data.FriendLowID === this.client.player.lowID) return // make sure the friend isnt u

    if (targetPlayer.friendToken === this.data.FriendToken && this.data.FriendToken !== '') { // make sure the tokens r matching and not blank
      const yourID = { highID: this.client.player.highID, lowID: this.client.player.lowID }
      const newFriendID = { highID: targetPlayer.highID, lowID: targetPlayer.lowID }

      await Promise.all([db.mongoosePlayers.updateOne(yourID, { $addToSet: { friends: newFriendID } }), db.mongoosePlayers.updateOne(newFriendID, { $addToSet: { friends: yourID } })])
      if (Array.isArray(this.client.player.friends) && !this.client.player.friends.some(friend => friend.highID === targetPlayer.highID && friend.lowID === targetPlayer.lowID)) {
        this.client.player.friends.push(newFriendID)
        this.client.player.markModified('friends')
      }

      await new FriendListUpdateMessage(this.client, targetPlayer).send()
      await FriendsListMessage.checkStatus(this.client)
    }
  }
}

module.exports = AcceptTokenFriendMessage