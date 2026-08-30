const PiranhaMessage = require('../../PiranhaMessage')

class AllianceStreamMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24719
    this.client = client
    this.version = 1
    this.highID = this.client?.player?.clan?.ClanHighID ?? 0
    this.lowID = this.client?.player?.clan?.ClanLowID ?? 1
  }

  async encode () {
    const db = this.client.mongoose
    const clan = await db.getClanByID(this.highID, this.lowID)
    const messages = Array.isArray(clan?.messages) ? clan.messages : []

    this.writeVInt(messages.length)

    for (const entry of messages) {
      const senderMember = clan?.members?.find(member =>
        member.highID === entry.senderHighID && member.lowID === entry.senderLowID
      ) || null

      const streamEntryType = entry.StreamEntryType ?? 2
      this.writeVInt(streamEntryType)
      this.writeLogicLong(0, entry.id ?? 0)
      this.writeLogicLong(entry.senderHighID ?? 0, entry.senderLowID ?? 0)
      this.writeLogicLong(entry.senderHighID ?? 0, entry.senderLowID ?? 0)

      this.writeString(entry.senderName)
      this.writeVInt(senderMember?.level ?? this.client.player?.level ?? 1)
      this.writeVInt(senderMember?.role ?? entry.senderRole ?? 1)
      this.writeVInt(entry.timestamp ? Math.max(0, Math.floor((Date.now() - entry.timestamp) / 1000)) : 0)
      this.writeBoolean(entry.IsRemoved ?? false)

      switch (streamEntryType) {
        case 1: // DonateStreamEntry
          this.writeVInt(0) // StreamEntryType: 1 = donation request??
          this.writeLong(entry.senderHighID, entry.senderLowID) // SenderHighID, SenderLowID: Who sent the request
          this.writeDataReference(entry.CardType, entry.CardInstance) // CardType: Card type (e.g., 26 = troop, 28 = spell), CardInstance: Card ID
          this.writeVInt(10) // TotalCapacity: Max cards that can be donated
          this.writeVInt(0) // UsedCapacity: Donated so far??
          this.writeVInt(0) // Number of donations??
          this.writeString(entry.Message) // Request message
          break
        case 2: // ChatChatStreamEntry
          this.writeString(entry.message || '') // Message
          break
        case 3: // JoinRequestAllianceStreamEntry
          this.writeString(entry.message || '')
          this.writeString(entry.senderName || this.client.player?.name || '')
          this.writeVInt(entry.state ?? 1) // State (1 = Pending, 2 = Accepted, 3 = Rejected)
          break
        case 4: // AllianceEventStreamEntry
          this.writeVInt(entry.eventType ?? 0) // EventType (1 = Kicked, 2 = Accepted, 3 = Joined, 4 = Left, 5 = Promoted, 6 = Demoted)
          this.writeLogicLong(entry.targetHighID ?? 0, entry.targetLowID ?? 1)
          this.writeString(entry.targetName || '')
          break
        case 5: // ReplayStreamEntry
          break
        case 6: // CoOpenStreamEntry
          break
        case 7: // DonationReceivedStreamEntry
          this.writeVInt(1) // Count
          {
            this.writeVInt(26)
            this.writeVInt(1)
          }
          break
        case 10: // ChallengeStreamEntry
          this.writeString(entry.message || '')

          this.writeBoolean(false) // AcceptingAvatarBoolean

          /*if (this.AcceptingAvatar != null)
          {
              this.writeString(this.AcceptingAvatar)
          }*/

          this.writeVInt(0) // SenderScore
          this.writeBoolean(false) // Closed
          this.writeBoolean(false) // TournamentMode
          this.writeVInt(0) // SpectatorCount
          this.writeBoolean(false) // AcceptingAvatarBoolean

          /*if (this.AcceptingAvatar != 0)
          {
              this.writeLong(0, 1) // AcceptingAvatarHighID, AcceptingAvatarLowID
          }*/

          this.writeVInt(0)

          this.writeBoolean(false)
          this.writeBoolean(false)
          break
        case 11: // ChallengeDoneStreamEntry
          break
        default:
          break
      }
    }
  }
}

module.exports = AllianceStreamMessage