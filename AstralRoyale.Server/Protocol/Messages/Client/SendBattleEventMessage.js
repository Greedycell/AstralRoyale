const PiranhaMessage = require('../../PiranhaMessage')
const BattleEventMessage = require('../Server/BattleEventMessage')

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
    this.data.HighId = this.readVInt()
    this.data.LowId = this.readVInt()
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
        /*const opponent = MatchmakingLobby.addPlayer(self.client)
        await new BattleEventMessage(this.client, this.data).send()
        if (!opponent) {
          self.client.log(`${self.client.player.lowID} emoted!`)
          return
        }
        if (opponent) {
          await new BattleEventMessage(opponent, this.data).sendOpponent(opponent)
        }*/
        break
      }
      case 6:
      {
        await new BattleEventMessage(this.client, this.data).send()
        break
      }
    }
  }
}

module.exports = SendBattleEventMessage