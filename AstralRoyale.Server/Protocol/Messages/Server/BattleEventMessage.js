const PiranhaMessage = require('../../PiranhaMessage')

class BattleEventMessage extends PiranhaMessage {
  constructor (client, data) {
    super()
    this.id = 29500
    this.client = client
    this.version = 1
    this.data = data
  }

  async encode () {
    this.writeVInt(this.data.Type)
    this.writeVInt(this.data.SenderHighID)
    this.writeVInt(this.data.SenderLowID)
    this.writeVInt(1)
    this.writeVInt(this.data.Tick)
    this.writeVInt(this.data.Unknown3)
    this.writeVInt(this.data.Value1)
    this.writeVInt(this.data.Value2)

    switch (this.data.Type) {
      case 1:
        this.client.log('Attempting to place down a card...')
        break
      case 3:
        /*this.writeVInt(this.data.Unknown)
        this.writeVInt(this.data.HandIndex)
        this.writeVInt(this.data.Unknown2)*/
        break
      case 6:
        this.writeVInt(this.data.Unknown)
        this.writeVInt(this.data.HandIndex)
        this.writeVInt(this.data.Unknown2)
        break
    }
  }
}

module.exports = BattleEventMessage