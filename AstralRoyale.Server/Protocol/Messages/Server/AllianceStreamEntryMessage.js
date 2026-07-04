const PiranhaMessage = require('../../PiranhaMessage')

class AllianceStreamEntryMessage extends PiranhaMessage {
  constructor (client, data) {
    super()
    this.id = 21075
    this.client = client
    this.version = 1
    this.data = data || {}
    this.StreamEntryType = this.data.StreamEntryType ?? 2
  }

  async encode () {
    const db = this.client.mongoose
    const clan = await db.getClanByID(this.client.player?.clan?.ClanHighID, this.client.player?.clan?.ClanLowID)

    this.writeVInt(this.StreamEntryType)
    this.writeVInt(0)
    this.writeVInt(this.data?.id ?? 0)
    this.writeVInt(this.data?.senderHighID ?? this.client.player?.highID ?? 0)
    this.writeVInt(this.data?.senderLowID ?? this.client.player?.lowID ?? 0)
    this.writeVInt(this.data?.senderHighID ?? this.client.player?.highID ?? 0)
    this.writeVInt(this.data?.senderLowID ?? this.client.player?.lowID ?? 0)

    this.writeString(this.data?.senderName ?? this.client.player?.name ?? '')
    this.writeVInt(this.client.player?.level ?? 1)
    this.writeVInt(this.data?.senderRole ?? this.client.player?.clan?.ClanRole ?? 1)

    this.writeVInt(this.data?.timestamp ? Math.max(0, Math.floor((Date.now() - this.data.timestamp) / 1000)) : 0)
    this.writeBoolean(this.data?.IsRemoved ?? false)

    switch (this.StreamEntryType) {
      case 1: // DonateStreamEntry
        this.writeVInt(1) // StreamEntryType: 1 = donation request??
        this.writeLong(0, 1) // SenderHighID, SenderLowID: Who sent the request
        this.writeVInt(26) // CardType: Card type (e.g., 26 = troop, 28 = spell)
        this.writeVInt(1) // CardInstance: Card ID
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
        this.writeVInt(eventType) // EventType (1 = Kicked, 2 = Accepted, 3 = Joined, 4 = Left, 5 = Promoted, 6 = Demoted)
        this.writeLogicLong(targetHighID, targetLowID)
        this.writeString(targetName)
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
        this.writeString(this.data.Message)

        this.writeBoolean(this.data.Active) // IsActive

        if (this.data.Active) this.writeString(this.data.TargetName)

        this.writeVInt(this.data.SenderScore)

        this.writeBoolean(this.data.Closed) // Closed
        this.writeVInt(this.data.Spectators) // Spectators

        this.writeBoolean(false)
        break
      case 11: // ChallengeDoneStreamEntry
        break
      default:
        break
    }
  }
}

module.exports = AllianceStreamEntryMessage