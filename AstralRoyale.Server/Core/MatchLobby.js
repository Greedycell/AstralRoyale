class MatchLobby {
  constructor() {
    this.lobbies = {
      normal: [],
      tournament: []
    }
  }

  getLobbyType(lobbyType) {
    return lobbyType === 'tournament' ? 'tournament' : 'normal'
  }

  addPlayer(client, lobbyType = 'normal') {
    const getLobbyType = this.getLobbyType(lobbyType)
    const lobby = this.lobbies[getLobbyType]

    if (lobby.find(p => p.player.lowID === client.player.lowID)) {
      return { opponent: null, lobbyType: getLobbyType }
    }

    const opponentIndex = lobby.findIndex(
      p => p.player.lowID !== client.player.lowID
    )

    if (opponentIndex !== -1) {
      const opponent = lobby.splice(opponentIndex, 1)[0]
      return { opponent, lobbyType: getLobbyType }
    }

    lobby.push(client)
    return { opponent: null, lobbyType: getLobbyType }
  }

  removePlayer(client, lobbyType = 'normal') {
    const getLobbyType = this.getLobbyType(lobbyType)
    this.lobbies[getLobbyType] = this.lobbies[getLobbyType].filter(
      p => p.player.lowID !== client.player.lowID
    )
  }
}

module.exports = new MatchLobby()