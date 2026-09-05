const PiranhaMessage = require('../../PiranhaMessage')

class AllianceStreamEntryMessage extends PiranhaMessage {
  constructor (client, data) {
    super()
    this.id = 21075
    this.client = client
    this.version = 11
    this.data = data || {}
    this.StreamEntryType = this.data.StreamEntryType ?? 2
  }

  async encode () {
    const db = this.client.mongoose
    const clan = await db.getClanByID(this.client.player?.clan?.ClanHighID, this.client.player?.clan?.ClanLowID)

    this.writeVInt(this.StreamEntryType)
    this.writeLogicLong(0, this.data?.id ?? 0)
    this.writeLogicLong(this.data?.senderHighID ?? 0, this.data?.senderLowID ?? 0)
    this.writeLogicLong(this.data?.senderHighID ?? 0, this.data?.senderLowID ?? 0)

    this.writeString(this.data?.senderName ?? this.client.player?.name ?? '')
    this.writeVInt(this.client.player?.level ?? 1)
    this.writeVInt(this.data?.senderRole ?? this.client.player?.clan?.ClanRole ?? 1)

    this.writeVInt(this.data?.timestamp ? Math.max(0, Math.floor((Date.now() - this.data.timestamp) / 1000)) : 0)
    this.writeBoolean(this.data?.IsRemoved ?? false)

    switch (this.StreamEntryType) {
      case 1: // DonateStreamEntry
        this.writeVInt(0) // StreamEntryType: 1 = donation request??
        this.writeLong(this.data.senderHighID, this.data.senderLowID) // SenderHighID, SenderLowID: Who sent the request
        this.writeDataReference(this.data.CardType, this.data.CardInstance) // CardType: Card type (e.g., 26 = troop, 28 = spell), CardInstance: Card ID
        this.writeVInt(10) // TotalCapacity: Max cards that can be donated
        this.writeVInt(0) // UsedCapacity: Donated so far??
        this.writeVInt(0) // Number of donations??
        this.writeString(this.data.Message) // Request message
        break
      case 2: // ChatChatStreamEntry
        this.writeString(this.data.Message) // Message
        break
      case 3: // JoinRequestAllianceStreamEntry
        this.writeString(this.data.Message) // SenderMessage
        this.writeString('Astral') // SenderName
        this.writeVInt(1) // State (1 = Pending, 2 = Accepted, 3 = Rejected)
        break
      case 4: // AllianceEventStreamEntry
          this.writeVInt(this.data.eventType ?? 0) // EventType (1 = Kicked, 2 = Accepted, 3 = Joined, 4 = Left, 5 = Promoted, 6 = Demoted)
          this.writeLogicLong(this.data.targetHighID ?? 0, this.data.targetLowID ?? 1)
          this.writeString(this.data.targetName)
        break
      case 5: // ReplayStreamEntry
        this.writeVInt(0)
        this.writeLong(0, 0)
        this.writeBoolean(false)
        this.writeString('')
        this.writeString('')
        this.writeString('')
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(0)
        break
      case 10: // ChallengeStreamEntry
        this.writeString(this.data.Message)
        this.writeBoolean(false) // AcceptingAvatarBoolean
        /*if (this.AcceptingAvatar != null)
        {
            this.writeString(this.AcceptingAvatar)
        }*/
        this.writeVInt(this.data.SenderScore ?? 0)
        this.writeBoolean(this.data.Closed ?? false) // Closed
        this.writeBoolean(this.data.Tournament ?? false) // TournamentMode
        this.writeVInt(this.data.Spectators ?? 0) // SpectatorCount
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
        this.writeString(this.data.Message)
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeBoolean(false)
        this.writeVInt(0)
        this.writeLong(0, 0)
        break
      default:
        break
    }
  }
}

module.exports = AllianceStreamEntryMessage