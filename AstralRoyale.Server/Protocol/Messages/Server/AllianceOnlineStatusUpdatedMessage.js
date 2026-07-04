const PiranhaMessage = require('../../PiranhaMessage')

class AllianceOnlineStatusUpdatedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24457
    this.client = client
    this.version = 1
  }

  async encode () {
    const db = this.client.mongoose
    const clan = this.client.player?.inClan ? await db.getClanByID(this.client.player.clan?.ClanHighID, this.client.player.clan?.ClanLowID) : null

    const OnlineAllianceMemberCount = clan ? Array.from(require('../../../Core/ConnectedClients')).filter(client => {
      return client && client.player && client.player.inClan &&
        client.player.clan?.ClanHighID === clan.highID &&
        client.player.clan?.ClanLowID === clan.lowID
    }).length : 0

    this.writeVInt(OnlineAllianceMemberCount) // OnlineAllianceMemberCount
    this.writeByte(0)
  }
}

module.exports = AllianceOnlineStatusUpdatedMessage