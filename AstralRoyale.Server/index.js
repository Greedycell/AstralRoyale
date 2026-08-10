console.clear()

const figlet = require('figlet')

const net = require('net')
const LogicScrollMessageFactory = require('./Protocol/LogicScrollMessageFactory')
const LogicBattle = require('./Core/LogicBattle')
const server = new net.Server()
const Messages = new LogicScrollMessageFactory()
const config = require('./config.json')
const PORT = config.Server.Port
const connectedClients = require('./Core/ConnectedClients')

const StreamEncrypter = require("./Crypto")

let mongooseInstance = require('./Database/mongoose')
mongooseInstance = new mongooseInstance()

server.on('connection', async (client) => {
  connectedClients.add(client)
  client.setNoDelay(true)
  client.log = function (text) {
    if (config.Server.Debug) {
      if (config.Server.StreamerMode) {
        return console.log(`[*] >> ${text}`)
      }
      else {
        return console.log(`[${this.remoteAddress.split(':').slice(-1)}] >> ${text}`)
      }
    }
    else
    {
      return console.log(`[*] >> ${text}`)
    }
  }

  client.log('A wild connection appeared!')
  client.crypto = config.Server.Crypto.Activated ? new StreamEncrypter(config.Server.Crypto.Type) : null
  client.mongoose = mongooseInstance

  const packets = Messages.getPackets()
  let receiveBuffer = Buffer.alloc(0)
  let packetQueue = Promise.resolve()

  const handlePacket = async (packet) => {
    const payloadLength = packet.readUIntBE(2, 3)

    const message = {
      id: packet.readUInt16BE(0),
      len: payloadLength,
      version: packet.readUInt16BE(5),
      payload: packet.subarray(7, 7 + payloadLength),
      client,
    }

    try {
      if (config.Server.Crypto.Activated) {
        message.payload = client.crypto.decrypt(message.id, message.payload)

        if (message.payload == null) {
          throw new Error(`Pepper decryption failed for packet ${message.id}`)
        }
      }
    } catch (e) {
      console.log(e)
      client.destroy()
      return
    }

    if (packets.indexOf(String(message.id)) !== -1) {
      try {
        const messageHandler = new (Messages.handle(message.id))(message.payload, client)

        if (config.Server.Debug) {
          client.log(`Gotcha ${message.id} (${messageHandler.constructor.name}) packet! `)
        }

        await messageHandler.decode()
        await messageHandler.process()
      } catch (e) {
        console.log(e)
      }
    } else {
      client.log(`Gotcha undefined ${message.id} packet!`)
    }
  }

  client.on('data', (chunk) => {
    if (client.destroyed || chunk.length === 0) return

    receiveBuffer = receiveBuffer.length === 0
      ? Buffer.from(chunk)
      : Buffer.concat([receiveBuffer, chunk])

    while (receiveBuffer.length >= 7) {
      const payloadLength = receiveBuffer.readUIntBE(2, 3)
      const frameLength = 7 + payloadLength

      if (receiveBuffer.length < frameLength) break

      const frame = Buffer.from(
        receiveBuffer.subarray(0, frameLength)
      )

      receiveBuffer = receiveBuffer.subarray(frameLength)

      packetQueue = packetQueue
        .then(() => handlePacket(frame))
        .catch((error) => {
          console.log(error)

          if (!client.destroyed) {
            client.destroy()
          }
        })
    }
  })

  client.on('end', async () => {
    connectedClients.delete(client)
    return client.log('Client disconnected.')
  })

  client.on('error', async error => {
    connectedClients.delete(client)

    try {
      client.log('A wild error!')
      console.log(error)
      client.destroy()
    } catch (e) { }
  })
})

console.log(figlet.textSync('AstralRoyale', { font: 'Slant' }))

mongooseInstance.connect(isSuccess => {
  if (isSuccess) {
    server.once('listening', () => {
      console.log(`[SERVER] >> Server started on ${PORT} port!`)
    })

    server.listen(PORT)
  }
  else {
    console.log("[SERVER] >> Server didn't start because of a database problem.")
  }
})

process.on("uncaughtException", e => console.log(e))

process.on("unhandledRejection", e => console.log(e))

async function resetBattleState () {
  for (const battle of LogicBattle.activeBattles.values()) {
    if (battle.interval) {
      clearInterval(battle.interval)
      battle.interval = null
    }
  }

  LogicBattle.activeBattles.clear()

  for (const client of connectedClients) {
    if (client && client.battle) {
      client.battle = null
    }
  }

  if (mongooseInstance && mongooseInstance.mongoosePlayers) {
    await mongooseInstance.mongoosePlayers.updateMany(
      { battleID: { $ne: 0 } },
      { $set: { battleID: 0 } }
    )
  }
}

let shutdownStarted = false

async function shutdown (signal) {
  if (shutdownStarted) return
  shutdownStarted = true

  console.log(`[SERVER] >> Cleaning active battles...`)

  try {
    await resetBattleState()
  } catch (error) {
    console.log(error)
  }

  for (const client of Array.from(connectedClients)) {
    try {
      if (client && !client.destroyed) {
        client.end()
        client.destroy()
      }
    } catch (error) {
      console.log(error)
    }
  }

  connectedClients.clear()

  if (typeof server.closeAllConnections === 'function') {
    try {
      server.closeAllConnections()
    } catch (error) {
      console.log(error)
    }
  }

  const closeTimeout = setTimeout(() => {
    console.log('[SERVER] >> Shutdown successful.')
    process.exit(0)
  }, 2000)

  server.close(async () => {
    clearTimeout(closeTimeout)

    try {
      await mongooseInstance.disconnect()
    } catch (error) {
      console.log(error)
    }

    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))