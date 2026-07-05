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
    const getQueueType = this.getQueueType(queueType)
    const queue = this.queues[getQueueType]

    if (queue.find(p => p.player.lowID === client.player.lowID)) {
      return { opponent: null, group: null, queueType: getQueueType }
    }

    if (getQueueType === '2v2') {
      queue.push(client)

      if (queue.length >= 4) {
        const group = queue.splice(0, 4)
        return { opponent: null, group, queueType: getQueueType }
      }

      return { opponent: null, group: null, queueType: getQueueType }
    }

    const opponentIndex = queue.findIndex(
      p => p.player.lowID !== client.player.lowID
    )

    if (opponentIndex !== -1) {
      const opponent = queue.splice(opponentIndex, 1)[0]
      return { opponent, group: null, queueType: getQueueType }
    }

    queue.push(client)
    return { opponent: null, group: null, queueType: getQueueType }
  }

  removePlayer(client, queueType = 'normal') {
    const getQueueType = this.getQueueType(queueType)
    this.queues[getQueueType] = this.queues[getQueueType].filter(
      p => p.player.lowID !== client.player.lowID
    )
  }
}

module.exports = new MatchmakingLobby()