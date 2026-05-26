console.clear()

const figlet = require('figlet')

const net = require('net')
const LogicScrollMessageFactory = require('./Protocol/LogicScrollMessageFactory')
const server = new net.Server()
const Messages = new LogicScrollMessageFactory()
const config = require('./config.json')
const PORT = config.Server.Port

const Crypto = require("./Crypto")

let mongooseInstance = require('./DataBase/mongoose');
mongooseInstance = new mongooseInstance();

server.on('connection', async (client) => {
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
  client.crypto = new Crypto()
  client.mongoose = mongooseInstance
  
  const packets = Messages.getPackets();

  client.on('data', async (packet) => {
    const message = {
      id: packet.readUInt16BE(0),
      len: packet.readUIntBE(2, 3),
      version: packet.readUInt16BE(5),
      payload: packet.slice(7, this.len),
      client,
    }
    
    message.payload = await client.crypto.decrypt(message.payload)

    if (packets.indexOf(String(message.id)) !== -1) {
      try {
        const packet = new (Messages.handle(message.id))(message.payload, client)

        if (config.Server.Debug) {
          client.log(`Gotcha ${message.id} (${packet.constructor.name}) packet! `)
        }

        await packet.decode()
        await packet.process()
      } catch (e) {
        console.log(e)
      }
    } else {
      client.log(`Gotcha undefined ${message.id} packet!`)
    }
  })

  client.on('end', async () => {
    return client.log('Client disconnected.')
  })

  client.on('error', async error => {
    try {
      client.log('A wild error!')
      console.log(error)
      client.destroy()
    } catch (e) { }
  })
})

console.log(figlet.textSync('AstralRoyale', {font: 'Slant'}))
mongooseInstance.connect(isSuccess => {
  if (isSuccess) {
    server.once('listening', () => console.log(`[SERVER] >> Server started on ${PORT} port!`))
    server.listen(PORT)
  }
  else {
    console.log("[SERVER] >> Server didn't start because of a database problem.")
  }
})

process.on("uncaughtException", e => console.log(e));

process.on("unhandledRejection", e => console.log(e));