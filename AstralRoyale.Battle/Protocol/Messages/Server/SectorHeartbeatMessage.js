const PiranhaMessage = require('../../PiranhaMessage')

class SectorHeartbeatMessage extends PiranhaMessage {
  constructor (client, turn, checksum, commands) {
    super()
    this.id = 21443
    this.client = client
    this.version = 1
    this.turn = turn
    this.checksum = checksum
    this.commands = commands
  }

  async encode () {
    this.writeHex('13a7ab9bda03019601b5027f319fd7e8537f01b3fe028b75018cba920000000041c00c0000')
    
    //this.writeVInt(this.turn)
    //this.writeVInt(this.checksum)

    //this.writeVInt(this.commands/*.Length*/)

    /*if (this.Commands.Length > 0)
    {
        ChecksumEncoder Encoder = new ChecksumEncoder(this.Stream)

        foreach (Command Command in this.Commands)
        {
            if (Command != null)
            {
                LogicCommandManager.EncodeCommand(Command, Encoder)
            }
            else
            {
                throw new LogicException(this.GetType(), "Command == null at Encode().")
            }
        }
    }*/
  }
}

module.exports = SectorHeartbeatMessage

/*
const PiranhaMessage = require('../../PiranhaMessage')

class SectorHeartbeatMessage extends PiranhaMessage {
  constructor (client, turn, checksum, commands) {
    super()
    this.id = 21443
    this.client = client
    this.version = 1
    this.turn = turn
    this.checksum = checksum
    this.commands = commands
  }

  async encode () {
    this.writeVInt(this.turn)
    this.writeVInt(this.checksum)

    this.writeVInt(this.commands.length)
    for (let cmd of this.commands) {
      this.writeVInt(cmd.type)
      this.writeVInt(cmd.tick) //tick * 10
      this.writeVInt(-1)
      this.writeVInt(cmd.userId.high)
      this.writeVInt(cmd.userId.low) //usr id
      this.writeVInt(-1)
      this.writeVInt(1)
      this.writeVInt(cmd.coords.x) //x
      this.writeVInt(cmd.coords.y) //y
      this.writeInt(cmd.card.id)
      this.writeInt(0)
      this.writeInt(cmd.checksum)
    }
  }
}

module.exports = SectorHeartbeatMessage
*/