const PiranhaMessage = require('../../PiranhaMessage')
const BattleEventMessage = require('../Server/BattleEventMessage')
const LogicBattle = require('../../../Core/LogicBattle')

class SendBattleEventMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 16068
    this.version = 1
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
    switch (this.data.Type)
    {
      case 1:
      {
        await new BattleEventMessage(this.client, this.data).send()
        break
      }
      case 3:
      {
        const activeBattle = this.client && this.client.player && this.client.player.battleID ? LogicBattle.getBattleById(this.client.player.battleID) : null

        if (activeBattle) {
          activeBattle.sendEvent(this.data, this.client)
        } else await new BattleEventMessage(this.client, this.data).send()
        break
      }
      case 6:
      {
        this.data.Unknown = this.readVInt()
        this.data.HandIndex = this.readVInt()
        this.data.Unknown2 = this.readVInt()

        // TODO: Get teamate

        // TODO: Teammate device
        await new BattleEventMessage(this.client, this.data).send()
        break
      }
    }
  }
}

module.exports = SendBattleEventMessage