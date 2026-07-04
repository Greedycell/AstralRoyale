class MatchmakingLobby {
  constructor() {
    this.queues = {
      normal: [],
      tournament: [],
      customTournament: [],
      '2v2': []
    }
  }

  getQueueType(queueType) {
    if (queueType === 'tournament') return 'tournament'
    if (queueType === 'customTournament') return 'customTournament'
    if (queueType === '2v2') return '2v2'
    return 'normal'
  }

  addPlayer(client, queueType = 'normal') {
    const normalizedType = this.getQueueType(queueType)
    const queue = this.queues[normalizedType]

    if (queue.find(p => p.player.lowID === client.player.lowID)) {
      return { opponent: null, group: null, queueType: normalizedType }
    }

    if (normalizedType === '2v2') {
      queue.push(client)

      if (queue.length >= 4) {
        const group = queue.splice(0, 4)
        return { opponent: null, group, queueType: normalizedType }
      }

      return { opponent: null, group: null, queueType: normalizedType }
    }

    const opponentIndex = queue.findIndex(
      p => p.player.lowID !== client.player.lowID
    )

    if (opponentIndex !== -1) {
      const opponent = queue.splice(opponentIndex, 1)[0]
      return { opponent, group: null, queueType: normalizedType }
    }

    queue.push(client)
    return { opponent: null, group: null, queueType: normalizedType }
  }

  removePlayer(client, queueType = 'normal') {
    const normalizedType = this.getQueueType(queueType)
    this.queues[normalizedType] = this.queues[normalizedType].filter(
      p => p.player.lowID !== client.player.lowID
    )
  }
}

module.exports = new MatchmakingLobby()