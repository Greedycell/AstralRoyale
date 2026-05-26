class MatchmakingLobby {
  constructor() {
    this.queue = []
  }

  addPlayer(client) {
    if (this.queue.find(p => p.player.lowID === client.player.lowID)) {
      return null
    }

    const opponentIndex = this.queue.findIndex(
      p => p.player.lowID !== client.player.lowID
    )

    if (opponentIndex !== -1) {
      const opponent = this.queue.splice(opponentIndex, 1)[0]
      return opponent
    }

    this.queue.push(client)
    return null
  }

  removePlayer(client) {
    this.queue = this.queue.filter(p => p.player.lowID !== client.player.lowID)
  }
}

module.exports = new MatchmakingLobby()