const ServerErrorMessage = require('../../Messages/Server/ServerErrorMessage')
const AllianceStreamEntryMessage = require('../../Messages/Server/AllianceStreamEntryMessage')
const ConnectedClients = require('../../../Core/ConnectedClients')

class LogicRequestSpellsCommand {
  constructor() {}

  async decode (self) {
    this.data = {}

    this.data.StartTick = self.readVInt()
    this.data.EndTick = self.readVInt()
    this.data.AccountHighID = self.readVInt()
    this.data.AccountLowID = self.readVInt()
    this.data.CardType = self.readVInt()
    this.data.CardInstance = self.readVInt()
    
    //console.log(this.data)
  }

  async process (self) {
    await new ServerErrorMessage(self.client, 'Requesting cards is not implemented yet.').send()
    return

    if (!self.client.player?.inClan) return

    const db = self.client.mongoose
    const clan = await db.getClanByID(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID)
    if (!clan) return

    const existingMessages = Array.isArray(clan.messages) ? clan.messages : []
    const entry = {
      id: existingMessages.reduce((max, message) => Math.max(max, Number(message.id) || 0), 0) + 1,
      StreamEntryType: 1,
      senderHighID: self.client.player.highID,
      senderLowID: self.client.player.lowID,
      senderName: self.client.player.name || '',
      senderRole: self.client.player.clan?.ClanRole || 1,
      timestamp: Date.now(),
      CardType: this.data.CardType,
      CardInstance: this.data.CardInstance,
      Message: ''
    }

    clan.messages = existingMessages.concat(entry).slice(-100)
    clan.markModified('messages')
    await clan.save()

    for (const client of ConnectedClients) {
      if (!client?.player?.inClan) continue
      if (client.player.clan?.ClanHighID !== clan.highID || client.player.clan?.ClanLowID !== clan.lowID) continue

      try {
        await new AllianceStreamEntryMessage(client, entry).send()
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = LogicRequestSpellsCommand