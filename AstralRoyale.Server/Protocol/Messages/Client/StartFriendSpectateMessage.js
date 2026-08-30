const PiranhaMessage = require('../../PiranhaMessage')
const ConnectedClients = require('../../../Core/ConnectedClients')
const LogicBattle = require('../../../Core/LogicBattle')

class StartFriendSpectateMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 16604
    this.version = 11
  }

  async decode () {
    this.data = {}

    this.data.HighID = this.readInt()
    this.data.LowID = this.readInt()

    //console.log(this.data)
  }

  async process () {
    if (!this.client || !this.client.player) return
    const targetClient = Array.from(ConnectedClients).find(client => client && client.player && client.player.highID === this.data.HighID && client.player.lowID === this.data.LowID)
    if (!targetClient || !targetClient.player || targetClient.player.battleID === 0 || targetClient === this.client) return
    const activeBattle = LogicBattle.getBattleById(targetClient.player.battleID)
    if (!activeBattle) return

    const options = {}
    options.arena = 2
    options.gamemode = 7
    options.live = true

    const db = this.client.mongoose
    let targetPlayer = null
    if (this.data.HighID !== undefined && this.data.LowID !== undefined) {
      try {
        targetPlayer = await db.getClientByID(this.data.HighID, this.data.LowID)
      } catch (e) {
        console.error(e)
        targetPlayer = null
      }
    }

    await activeBattle.joinLive(this.client, targetPlayer, options)
  }
}

module.exports = StartFriendSpectateMessage