const PiranhaMessage = require('../../PiranhaMessage')
const FriendsListMessage = require('../Server/FriendsListMessage')

class RemoveFriendMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 18476
    this.version = 1
  }

  async decode () {
    this.data = {}

    const [highID, lowID] = this.readLong()
    this.data.FriendHighID = highID
    this.data.FriendLowID = lowID

    //console.log(this.data)
  }

  async process () {
    const db = this.client.mongoose

    if (this.data.FriendHighID === undefined || this.data.FriendLowID === undefined) return
    if (this.data.FriendHighID === this.client.player.highID && this.data.FriendLowID === this.client.player.lowID) return

    const yourID = { highID: this.client.player.highID, lowID: this.client.player.lowID }
    const friendID = { highID: this.data.FriendHighID, lowID: this.data.FriendLowID }
    await Promise.all([db.mongoosePlayers.updateOne(yourID, { $pull: { friends: friendID } }), db.mongoosePlayers.updateOne(friendID, { $pull: { friends: yourID } })])
    if (Array.isArray(this.client.player.friends)) {
      this.client.player.friends = this.client.player.friends.filter(friend => friend.highID !== this.data.FriendHighID || friend.lowID !== this.data.FriendLowID)
      this.client.player.markModified('friends')
    }

    await new FriendsListMessage(this.client, 0).send()
  }
}

module.exports = RemoveFriendMessage