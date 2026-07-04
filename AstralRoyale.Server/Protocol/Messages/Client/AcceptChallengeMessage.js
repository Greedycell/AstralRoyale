const PiranhaMessage = require('../../PiranhaMessage')
const ConnectedClients = require('../../../Core/ConnectedClients')
const LogicBattle = require('../../../Core/LogicBattle')
const StopHomeLogicMessage = require('../Server/StopHomeLogicMessage')
const UdpConnectionInfoMessage = require('../Server/UdpConnectionInfoMessage')
const SectorStateMessage = require('../Server/SectorStateMessage')
const AllianceStreamMessage = require('../Server/AllianceStreamMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')

class AcceptChallengeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 11339
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.EntryHighID = this.readVInt()
    this.data.EntryLowID = this.readVInt()

    //console.log(this.data)
  }

  async process () {
    await new LoginFailedMessage(this.client, 3, 'Accepting a challenge is not implemented yet.').send()

    /*const db = this.client.mongoose
    const clan = await db.getClanByID(this.client.player?.clan?.ClanHighID, this.client.player?.clan?.ClanLowID)

    if (!clan || !Array.isArray(clan.messages)) return

    const targetEntry = clan.messages.find(entry =>
      Number(entry.id) === Number(this.data.EntryLowID) ||
      Number(entry.lowID) === Number(this.data.EntryLowID)
    )

    if (!targetEntry) return

    const senderClient = Array.from(ConnectedClients).find(client =>
      client?.player &&
      client.player.highID === targetEntry.senderHighID &&
      client.player.lowID === targetEntry.senderLowID
    )

    clan.messages = clan.messages.filter(entry =>
      Number(entry.id) !== Number(this.data.EntryLowID) &&
      Number(entry.lowID) !== Number(this.data.EntryLowID)
    )
    clan.markModified('messages')
    await clan.save()

    for (const client of ConnectedClients) {
      if (!client?.player || !client.player.inClan) continue
      if (client.player.clan?.ClanHighID !== clan.highID || client.player.clan?.ClanLowID !== clan.lowID) continue
      await new AllianceStreamMessage(client).send()
    }

    if (senderClient && senderClient !== this.client) {
      const battle = new LogicBattle()
      battle.battleType = 'friendlyClan1v1'
      battle.clients.push(this.client, senderClient)
      await battle.start(500, this.client, senderClient)

      await new StopHomeLogicMessage(this.client).send()
      await new UdpConnectionInfoMessage(this.client).send()
      await new SectorStateMessage(this.client, 1, senderClient.player).send()

      await new StopHomeLogicMessage(senderClient).sendOpponent(senderClient)
      await new UdpConnectionInfoMessage(senderClient).sendOpponent(senderClient)
      await new SectorStateMessage(senderClient, 1, this.client.player).sendOpponent(senderClient)
    }*/
  }
}

module.exports = AcceptChallengeMessage