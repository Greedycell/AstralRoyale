const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const AllianceStreamMessage = require('../Server/AllianceStreamMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')
const AllianceStreamEntryMessage = require('../Server/AllianceStreamEntryMessage')
const AllianceDataMessage = require('../Server/AllianceDataMessage')
const ConnectedClients = require('../../../Core/ConnectedClients')

class ChangeAllianceMemberRoleMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 16341
    this.version = 11
  }

  async decode () {
    this.data = {}

    const [highID, lowID] = this.readLong()
    this.data.MemberHighID = highID
    this.data.MemberLowID = lowID
    this.data.NewRole = this.readVInt()
  }

  async process () {
    const player = this.client.player
    const db = this.client.mongoose

    if (!player.inClan) {
      await new OutOfSyncMessage(this.client).send()
      return
    }

    const clan = await db.getClanByID(player.clan.ClanHighID, player.clan.ClanLowID)

    if (!clan) {
      await new OutOfSyncMessage(this.client).send()
      return
    }

    try {
      const targetPlayer = await db.mongoosePlayers.findOne({
        highID: this.data.MemberHighID,
        lowID: this.data.MemberLowID
      })

      if (!targetPlayer) return

      // role handling (1 = member, 2 = leader, 3 = elder, 4 = co-leader)
      {
        const actorRole = Number(player.clan.ClanRole)
        const targetOldRole = Number(targetPlayer.clan.ClanRole)
        const newRole = Number(this.data.NewRole)

        if (![1, 2, 3, 4].includes(newRole)) return

        const isSelf = targetPlayer.highID === player.highID &&
          targetPlayer.lowID === player.lowID

        if (targetOldRole === actorRole && !(actorRole === 2 && isSelf && newRole === 4)) return

        if (actorRole === 2) {
          if (isSelf) {
            if (newRole !== 4) return

            await db.mongoosePlayers.updateOne(
              { highID: player.highID, lowID: player.lowID },
              { $set: { 'clan.ClanRole': 4 } }
            )

            player.clan.ClanRole = 4
            targetPlayer.clan.ClanRole = 4
          } else {
            if (newRole === 2) {
              await db.mongoosePlayers.updateOne(
                { highID: player.highID, lowID: player.lowID },
                { $set: { 'clan.ClanRole': 4 } }
              )

              player.clan.ClanRole = 4
            }

            await db.mongoosePlayers.updateOne(
              { highID: targetPlayer.highID, lowID: targetPlayer.lowID },
              { $set: { 'clan.ClanRole': newRole } }
            )

            targetPlayer.clan.ClanRole = newRole
          }
        } else if (actorRole === 4) {
          if (![1, 3].includes(targetOldRole) || ![3, 4].includes(newRole)) return

          await db.mongoosePlayers.updateOne(
            { highID: targetPlayer.highID, lowID: targetPlayer.lowID },
            { $set: { 'clan.ClanRole': newRole } }
          )

          targetPlayer.clan.ClanRole = newRole
        } else if (actorRole === 3) {
          if (targetOldRole !== 1 || newRole !== 3) return

          await db.mongoosePlayers.updateOne(
            { highID: targetPlayer.highID, lowID: targetPlayer.lowID },
            { $set: { 'clan.ClanRole': newRole } }
          )

          targetPlayer.clan.ClanRole = newRole
        } else {
          return
        }

        const targetMember = clan.members.find(
          member => member.highID === targetPlayer.highID &&
            member.lowID === targetPlayer.lowID
        )

        if (!targetMember) return

        targetMember.role = newRole

        if (actorRole === 2 && newRole === 2 && !isSelf) {
          const actorMember = clan.members.find(
            member => member.highID === player.highID &&
              member.lowID === player.lowID
          )

          if (actorMember) actorMember.role = 4
        }

        if (actorRole === 2 && isSelf && newRole === 4) {
          targetMember.role = 4
        }

        clan.markModified('members')
        await clan.save()

        const roleOrder = { 1: 1, 2: 4, 3: 2, 4: 3 }
        this.data.EventType = roleOrder[newRole] > roleOrder[targetOldRole] ? 5 : 6
      }

      await new AvailableServerCommandMessage(this.client, 206, this.data).send()

      const existingMessages = Array.isArray(clan.messages) ? clan.messages : []
      const nextID = existingMessages.reduce(
        (max, message) => Math.max(max, Number(message.id) || 0),
        0
      ) + 1

      const entry = {
        id: nextID,
        StreamEntryType: 4,
        senderHighID: player.highID,
        senderLowID: player.lowID,
        senderName: player.name,
        senderRole: player.clan?.ClanRole || 1,
        timestamp: Date.now(),
        eventType: this.data.EventType,
        targetHighID: targetPlayer.highID,
        targetLowID: targetPlayer.lowID,
        targetName: targetPlayer.name
      }

      const entries = [entry]

      // when leader gets demoted to co-leader and co-leader becomes the new leader
      if (Number(this.data.NewRole) === 2) {
        entries.push({
          ...entry,
          id: nextID + 1,
          senderHighID: targetPlayer.highID,
          senderLowID: targetPlayer.lowID,
          senderName: targetPlayer.name,
          senderRole: 2,
          eventType: 6,
          targetHighID: player.highID,
          targetLowID: player.lowID,
          targetName: player.name
        })
      }

      clan.messages = existingMessages.concat(entries).slice(-100)
      clan.markModified('messages')
      await clan.save()

      for (const client of ConnectedClients) {
        try {
          if (
            client.player?.inClan &&
            String(client.player.clan?.ClanHighID) === String(player.clan.ClanHighID) &&
            String(client.player.clan?.ClanLowID) === String(player.clan.ClanLowID)
          ) {
            for (const message of entries) {
              await new AllianceStreamEntryMessage(client, message).send()
            }

            await new AllianceDataMessage(client, client.player.clan.ClanHighID, client.player.clan.ClanLowID).send()
          }
        } catch (error) {
          console.log(error)
        }
      }
    } catch (e) {
      console.error(e)
      await new OutOfSyncMessage(this.client).send()
    }
  }
}

module.exports = ChangeAllianceMemberRoleMessage