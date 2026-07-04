const OutOfSyncMessage = require('../../Messages/Server/OutOfSyncMessage')
const KickAllianceMemberOkMessage = require('../../Messages/Server/KickAllianceMemberOkMessage')
const AllianceStreamEntryMessage = require('../../Messages/Server/AllianceStreamEntryMessage')
const AllianceStreamMessage = require('../../Messages/Server/AllianceStreamMessage')
const ConnectedClients = require('../../../Core/ConnectedClients')

class LogicKickAllianceMemberCommand {
  constructor () {}

  async decode (self) {
    this.data = {}

    self.readVInt()
    self.readVInt()
    this.data.Message = self.readString()
    this.data.MemberHighID = self.readVInt()
    this.data.MemberLowID = self.readVInt()

    //console.log(this.data)
  }

  async process (self) {
    const db = self.client.mongoose

    if (!self.client.player?.inClan) {
      await new OutOfSyncMessage(self.client).send()
      return
    }

    const clan = await db.getClanByID(self.client.player.clan?.ClanHighID, self.client.player.clan?.ClanLowID)
    if (!clan) {
      await new OutOfSyncMessage(self.client).send()
      return
    }

    const requesterEntry = (clan.members || []).find(member => member.highID === self.client.player.highID && member.lowID === self.client.player.lowID)
    const targetEntry = (clan.members || []).find(member => member.highID === this.data.MemberHighID && member.lowID === this.data.MemberLowID)

    if (!requesterEntry || !targetEntry) {
      await new OutOfSyncMessage(self.client).send()
      return
    }

    clan.members = (clan.members || []).filter(member => !(member.highID === this.data.MemberHighID && member.lowID === this.data.MemberLowID))

    if (clan.members.length === 0) {
      await db.mongooseClans.deleteOne({ highID: clan.highID, lowID: clan.lowID })
    } else {
      clan.trophies = clan.members.reduce((sum, member) => sum + (member.trophies || 0), 0)
      clan.markModified('members')
      await clan.save()
    }

    const targetPlayer = await db.mongoosePlayers.findOne({ highID: this.data.MemberHighID, lowID: this.data.MemberLowID })
    if (targetPlayer) {
      targetPlayer.inClan = 0
      targetPlayer.clan = { ClanHighID: 0, ClanLowID: 1, ClanRole: 0 }
      targetPlayer.markModified('clan')
      await targetPlayer.save()
    }

    const eventEntry = {
      id: Date.now(),
      StreamEntryType: 4,
      senderHighID: self.client.player.highID,
      senderLowID: self.client.player.lowID,
      senderName: self.client.player.name || '',
      senderRole: requesterEntry.role,
      timestamp: Date.now(),
      eventType: 1,
      targetHighID: this.data.MemberHighID,
      targetLowID: this.data.MemberLowID,
      targetName: targetEntry.name || `${this.data.MemberHighID}:${this.data.MemberLowID}`
    }

    if (Array.isArray(clan.messages)) {
      clan.messages = clan.messages.concat(eventEntry)
      clan.messages = clan.messages.slice(-100)
      clan.markModified('messages')
      await clan.save()
    }

    for (const client of ConnectedClients) {
      if (!client?.player || !client.player.inClan) continue
      if (client.player.clan?.ClanHighID !== clan.highID || client.player.clan?.ClanLowID !== clan.lowID) continue

      if (client === self.client) {
        await new AllianceStreamMessage(client).send()
      } else {
        await new AllianceStreamEntryMessage(client, eventEntry).send()
      }
    }

    await new KickAllianceMemberOkMessage(self.client).send()
  }
}

module.exports = LogicKickAllianceMemberCommand