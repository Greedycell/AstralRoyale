class MatchLobby {
  constructor() {
    this.lobby = []
  }

  addPlayer(client) {
    if (this.lobby.find(p => p.player.lowID === client.player.lowID)) {
      return null
    }

    const opponentIndex = this.lobby.findIndex(
      p => p.player.lowID !== client.player.lowID
    )

    if (opponentIndex !== -1) {
      const opponent = this.lobby.splice(opponentIndex, 1)[0]
      return opponent
    }

    this.lobby.push(client)
    return null
  }

  removePlayer(client) {
    this.lobby = this.lobby.filter(p => p.player.lowID !== client.player.lowID)
  }
}

module.exports = new MatchLobby()