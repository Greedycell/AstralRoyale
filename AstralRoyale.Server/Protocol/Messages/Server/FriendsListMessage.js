const PiranhaMessage = require('../../PiranhaMessage')
const ConnectedClients = require('../../../Core/ConnectedClients')
const AvatarOnlineStatusUpdatedMessage = require('./AvatarOnlineStatusUpdatedMessage')

class FriendsListMessage extends PiranhaMessage {
  constructor (client, type) {
    super()
    this.id = 29494
    this.client = client
    this.version = 3
    this.type = type
  }

  async encode () {
    this.writeInt(this.type) // 0 = Invited | 1 = Facebook (?) | 2 = Gamecenter (?)
    const player = await this.client.mongoose.getPlayerByID(this.client.player.highID, this.client.player.lowID)
    const friendList = player && Array.isArray(player.friends) ? player.friends : []
    const friends = (await Promise.all(friendList.map(friend =>
      this.client.mongoose.getPlayerByID(friend.highID, friend.lowID)
    ))).filter(Boolean)

    this.writeInt(friends.length) // FriendsCount
    for (const friend of friends) {
      this.writeLong(friend.highID, friend.lowID)
      this.writeBoolean(true)
      {
        this.writeLong(friend.highID, friend.lowID)
      }
      this.writeString(friend.name)
      this.writeVInt(0)
      this.writeVInt(friend.trophies || 0)
      this.writeBoolean(friend.inClan === 1)
      if (friend.inClan === 1) {
        let clan = null
        try {
          clan = await this.client.mongoose.getClanByID(friend.clan.ClanHighID, friend.clan.ClanLowID)
        } catch (e) {
          console.error(e)
        }

        this.writeLong(friend.clan.ClanHighID, friend.clan.ClanLowID)
        this.writeString(clan ? String(clan.name || '') : '')
        this.writeVInt(clan ? clan.badge + 1 : 1)
        this.writeVInt(friend.clan.ClanRole)
      }
      this.writeBoolean(true)
      this.writeVInt(54)
      this.writeVInt(friend.arena || 0)
      this.writeString(null)
      this.writeString(null)
      this.writeVInt(0)
    }
  }

  static async checkStatus (client) {
    const player = await client.mongoose.getPlayerByID(client.player.highID, client.player.lowID)
    const friends = player && Array.isArray(player.friends) ? player.friends : []
    for (const friend of friends) {
      const connectedFriend = Array.from(ConnectedClients).find(connectedClient => {return connectedClient && connectedClient.player && Number(connectedClient.player.highID) === Number(friend.highID) && Number(connectedClient.player.lowID) === Number(friend.lowID)})
      const status = connectedFriend ? (Number(connectedFriend.player.battleID || 0) !== 0 ? 3 : 2) : 0
      await new AvatarOnlineStatusUpdatedMessage(client, friend.highID, friend.lowID, status).send()
    }
  }

  static async updateFriendStatus (client) {
    try {
      const player = await client.mongoose.getPlayerByID(client.player.highID, client.player.lowID)
      const friends = player && Array.isArray(player.friends) ? player.friends : []
      const status = Number(client.player.battleID || 0) !== 0 ? 3 : 2
      for (const friend of friends) {
        const friendClient = Array.from(ConnectedClients).find(connectedClient => {return connectedClient && connectedClient.player && Number(connectedClient.player.highID) === Number(friend.highID) && Number(connectedClient.player.lowID) === Number(friend.lowID)})
        if (friendClient) await new AvatarOnlineStatusUpdatedMessage(friendClient, client.player.highID, client.player.lowID, status).send()
      }
    } catch (e) {}
  }
}

module.exports = FriendsListMessage
