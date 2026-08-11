const SectorHeartbeatMessage = require('../Protocol/Messages/Server/SectorHeartbeatMessage')
const BattleResultMessage = require('../Protocol/Messages/Server/BattleResultMessage')
const BattleEventMessage = require('../Protocol/Messages/Server/BattleEventMessage')
const StopHomeLogicMessage = require('../Protocol/Messages/Server/StopHomeLogicMessage')
const UdpConnectionInfoMessage = require('../Protocol/Messages/Server/UdpConnectionInfoMessage')
const SectorStateMessage = require('../Protocol/Messages/Server/SectorStateMessage')

class LogicBattle {
  constructor() {
    this.id = LogicBattle.getNextBattleID()
    this.turn = 1
    this.checksum = 0
    this.commands = []
    this.battleLastCommandTime = Date.now()
    this.crowns = []
    this.clients = []
    this.goHomeCount = 0
    this.goHomePlayers = new Set()
    this.ended = false
    this.battleType = '1v1'
    LogicBattle.activeBattles.set(this.id, this)
    for (let i = 0; i < this.clients.length; i++) {
      let allclients = this.clients[i]
      allclients.battle = this
      this.crowns.push(0)
    }
  }

  static activeBattles = new Map()

  static getNextBattleID() {
    let nextID = 1
    while (LogicBattle.activeBattles.has(nextID)) { nextID++ }
    return nextID
  }

  static getBattleById(battleID) { return LogicBattle.activeBattles.get(battleID) || null }

  async rejoinClient(client) {
    if (!client || !client.player) return false
    this.addClient(client)
    return this.resyncClient(client)
  }

  addClient(client) {
    if (!client || !client.player) return false
    if (!this.clients.includes(client)) {
      this.clients.push(client)
      client.battle = this
      this.crowns.push(0)
    } else if (!client.battle) client.battle = this

    return true
  }

  async start(seconds, ...players) {
    if (this.interval) return

    const activePlayers = players.length ? players : this.clients
    if (activePlayers.length < 2) return
    for (const client of activePlayers) this.addClient(client)

    this.time = seconds
    this.turn = 0
    this.ended = false
    let tickCount = 0
    await this.setBattleToClients(...activePlayers)

    this.interval = setInterval(async () => {
      if (this.ended) {
        clearInterval(this.interval)
        this.interval = null
        return
      }

      this.turn++
      tickCount++
      this.time--

      const pendingCommands = this.commands.splice(0)
      this.checksum = this.calculateChecksum(this.turn, pendingCommands)
      const battleClients = this.clients.filter(client => client && client.player)

      for (const client of battleClients) {
        if (!client || !client.player) continue
        client.tick = tickCount
        await new SectorHeartbeatMessage(client, this.turn, this.checksum, pendingCommands).send()
      }

      if (this.time <= 13) {
        for (const client of battleClients) {
          if (!client || !client.player) continue
          const opponent = battleClients.find(candidate => candidate.player.lowID !== client.player.lowID)
          if (opponent) {
            await new BattleResultMessage(client, 1, opponent).send()
          }
        }
      }
    }, 500)
  }

  async setBattleToClients(...clients) {
    for (const client of clients) {
      if (!client || !client.player) continue
      client.player.battleID = this.id
      client.player.markModified('battleID')
      await client.player.save()
    }
  }

  async endBattle() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.ended = true
    this.goHomePlayers.clear()
    this.goHomeCount = 0
    for (const client of this.clients) {
      if (!client || !client.player) continue
      client.player.battleID = 0
      client.player.markModified('battleID')
      await client.player.save()
      if (client.battle === this) {
        client.battle = null
      }
    }

    this.clients.length = 0
    LogicBattle.activeBattles.delete(this.id)
  }

  getActiveClients() {
    return this.clients.filter(client => client && client.player && !client.destroyed)
  }

  removeClient(client) {
    if (!client || !client.player) return false
    const index = this.clients.indexOf(client)
    if (index === -1) return false
    this.clients.splice(index, 1)
    if (client.battle === this) {
      client.battle = null
    }
    return true
  }

  async resyncClient(client) {
    if (!client || !client.player) return false
    const opponent = this.getOpponent(client)
    await new StopHomeLogicMessage(client).send()
    await new UdpConnectionInfoMessage(client).send()
    await new SectorStateMessage(client, this.getBattleType(), opponent ? opponent.player : client.player).send()
    await new SectorHeartbeatMessage(client, this.turn, this.checksum, (this.commands || []).slice()).send()
    return true
  }

  getBattleType() {
    switch (this.battleType) {
      case '2v2': return 2
      case 'friendlyClan1v1': return 1
      case '1v1': return 1
      default: return 1
    }
  }

  getOpponent(client) { return this.clients.find(candidate => candidate.player.lowID !== client.player.lowID) || null }

  isFriendlyClan1v1() {
    return this.battleType === 'friendlyClan1v1'
  }

  stopBattle(client) {
    if (!client || !client.player) return false
    if (!this.goHomePlayers.has(client.player.lowID)) {
      this.goHomePlayers.add(client.player.lowID)
      this.goHomeCount++
    }

    const activeCount = this.getActiveClients().length
    if (this.goHomeCount >= activeCount) {
      this.endBattle()
      return true
    }

    return true
  }

  sendEvent(event, from) {
    const eventclients = this.clients.filter(client => client && client !== from)
    for (const client of eventclients) new BattleEventMessage(client, event).send()
  }

  calculateChecksum(turn, commands) {
    let hash = 0x811c9dc5
    const mix = (value) => {
      const number = Number.isFinite(value) ? value : 0
      hash ^= (number & 0xff)
      hash = Math.imul(hash, 0x01000193)
      hash ^= ((number >> 8) & 0xff)
      hash = Math.imul(hash, 0x01000193)
      hash ^= ((number >> 16) & 0xff)
      hash = Math.imul(hash, 0x01000193)
      hash ^= ((number >> 24) & 0xff)
      hash = Math.imul(hash, 0x01000193)
    }
    mix(turn)
    mix(commands ? commands.length : 0)
    for (const command of commands || []) {
      mix(command && command.type ? command.type : 0)
      mix(command && command.tick ? command.tick : 0)
      mix(command && command.userId && command.userId.high ? command.userId.high : 0)
      mix(command && command.userId && command.userId.low ? command.userId.low : 0)
      mix(command && command.deckIndex ? command.deckIndex : 0)
      mix(command && command.card && command.card.high ? command.card.high : 0)
      mix(command && command.card && command.card.low ? command.card.low : 0)
      mix(command && command.spellIndex ? command.spellIndex : 0)
      mix(command && command.card && command.card.level ? command.card.level : 0)
      mix(command && command.coords && command.coords.x ? command.coords.x : 0)
      mix(command && command.coords && command.coords.y ? command.coords.y : 0)
    }
    let checksum = hash >>> 0
    while (checksum > 1000) { checksum = Math.floor(checksum / 10) }
    return checksum
  }

  getTime() { return this.time }
}

module.exports = LogicBattle
