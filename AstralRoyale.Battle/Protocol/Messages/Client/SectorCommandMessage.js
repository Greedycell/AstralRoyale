const PiranhaMessage = require('../../PiranhaMessage')
//const cardUtils = require('../../../Utils/cardUtils')
const DoSpellCommand = require('../../Commands/DoSpellCommand')

class SectorCommandMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10541
    this.version = 1
  }

  async decode () {
    /*let json = {}
    let buf = this
    buf.readVInt()
    buf.readVInt() // Tick again
    json.commandCount = buf.readByte()
    try {
        for (let i = 0; i < json.commandCount; i++) {
            let command = {}
            command.type = buf.readByte()
            command.tick = buf.readVInt()
            buf.readByte()
            command.userId = {
                high: buf.readVInt(),
                low: buf.readVInt()
            }
            command.deckIndex = buf.readByte() // Card slot ??
            command.card = {
                high: buf.readByte(),
                low: buf.readVInt()
            } // SCID
            command.card.id = cardUtils.SCIDtoInstanceID(command.card.high * 1000000 + command.card.low)
            console.log(command.card)
            buf.readByte()
            buf.readByte()
            command.coords = {
                x: buf.readVInt(),
                y: buf.readVInt()
            }
            //command.deb = cardUtils.SCIDtoInstanceID(command.card.high * 1000000 + command.card.low).name

            // if (
            //   this.json.checksum < 100000000 &&
            //   this.client.battle.clients.length > 1
            // ) {
            //   this.client.destroy();
            //   return;
            // }
            if (
              ["2600", "2700", "2800", "5000"].includes(
                command.card.id.toString().slice(0, 4),
              )
            ) {
              this.client.battle.commands.push(command);
            }

            this.client.battle.battleLastCommandTime = Date.now();
        }
    } catch (e) { console.log(e) }
    console.log(json)*/
  }

  async process () {
    /*this.client.LastSectorCommand = Date.now() / 1000 | 0

    for (var i = 0; i < this.data.Count; i++)
    {
        var type = this.readVInt()

        if (type >= 500) break;

        var Commands = {
          51: DoSpellCommand
        }

        if (type in Commands) {
          var command = new Commands[type]
          this.client.log(`SectorCommand ${type} (${command.constructor.name}) handled!`)
          command.decode(this)
          command.encode(this)
          command.process(this)
        }
        else {
          //this.client.log(`SectorCommand ${type} isn't handled!`)
        }

        //this.client.log(`SectorCommand ${type} with Tick ${this.data.Tick} has been processed.`);
    }*/
  }
}

module.exports = SectorCommandMessage