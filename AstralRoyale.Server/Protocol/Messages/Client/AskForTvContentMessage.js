const PiranhaMessage = require('../../PiranhaMessage')
const RoyalTVContentMessage = require('../Server/RoyalTVContentMessage')

class AskForTVContentMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10185
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.ClassId = this.readVInt()
    this.data.InstanceId = this.readVInt()

    //console.log(this.data)
  }

  async process () {
    await new RoyalTVContentMessage(this.client, this.data.ClassId, this.data.InstanceId).send()
  }
}

module.exports = AskForTVContentMessage