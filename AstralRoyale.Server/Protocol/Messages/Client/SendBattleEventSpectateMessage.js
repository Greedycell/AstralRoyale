const PiranhaMessage = require('../../PiranhaMessage')
const BattleEventMessage = require('../Server/BattleEventMessage')
const LogicBattle = require('../../../Core/LogicBattle')

class SendBattleEventSpectateMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 19061
    this.version = 27
  }

  async decode () {
    this.data = {}
    
    this.data.Type = this.readVInt()
    this.data.SenderHighID = this.readVInt()
    this.data.SenderLowID = this.readVInt()
    this.readVInt()
    this.data.Tick = this.readVInt()
    this.data.Unknown3 = this.readVInt()
    this.data.Value1 = this.readVInt()
    this.data.Value2 = this.readVInt()

    //console.log(this.data)
  }

  async process () {
    // send confetti
    //await new BattleEventMessage(this.client, this.data).send()
  }
}

module.exports = SendBattleEventSpectateMessage
