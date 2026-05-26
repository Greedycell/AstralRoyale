console.clear()

const figlet = require('figlet')

const dgram = require('dgram')
const LogicScrollMessageFactory = require('./Protocol/LogicScrollMessageFactory')
const server = dgram.createSocket('udp4')

const Messages = new LogicScrollMessageFactory()
const config = require('./config.json')
const PORT = config.Server.Port

const Crypto = require("./Crypto")

server.on('message', async (packet, rinfo) => {
  const client = {
    address: rinfo.address,
    port: rinfo.port,
    crypto: new Crypto(),
    log: function (text) {
      if (config.Server.Debug) {
        if (config.Server.StreamerMode) {
          return console.log(`[*] >> ${text}`)
        } else {
          return console.log(`[${this.address}:${this.port}] >> ${text}`) 
        }
      } else {
        return console.log(`[*] >> ${text}`)
      }
    },
    send: (buffer) => {
      server.send(buffer, rinfo.port, rinfo.address)
    }
  }

  client.log('A wild connection appeared!')

  const packets = Messages.getPackets();

  try {
    const message = {
      id: packet.readUInt16BE(0),
      len: packet.readUIntBE(2, 3),
      version: packet.readUInt16BE(5),
      payload: packet.slice(7),
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

  } catch (e) {
    console.log(e)
  }
})

console.log(figlet.textSync('AstralRoyale Battle', {font: 'Slant'}))
server.on('listening', () => console.log(`[SERVER] >> UDP Server started on ${PORT} port!`))
server.bind(PORT)

process.on("uncaughtException", e => console.log(e));
process.on("unhandledRejection", e => console.log(e));