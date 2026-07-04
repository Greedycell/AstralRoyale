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
    const normalizedType = this.getLobbyType(lobbyType)
    const lobby = this.lobbies[normalizedType]

    if (lobby.find(p => p.player.lowID === client.player.lowID)) {
      return { opponent: null, lobbyType: normalizedType }
    }

    const opponentIndex = lobby.findIndex(
      p => p.player.lowID !== client.player.lowID
    )

    if (opponentIndex !== -1) {
      const opponent = lobby.splice(opponentIndex, 1)[0]
      return { opponent, lobbyType: normalizedType }
    }

    lobby.push(client)
    return { opponent: null, lobbyType: normalizedType }
  }

  removePlayer(client, lobbyType = 'normal') {
    const normalizedType = this.getLobbyType(lobbyType)
    this.lobbies[normalizedType] = this.lobbies[normalizedType].filter(
      p => p.player.lowID !== client.player.lowID
    )
  }
}

module.exports = new MatchLobby()