const PiranhaMessage = require('../../PiranhaMessage')
const OwnHomeDataMessage = require('../Server/OwnHomeDataMessage')

class GoHomeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14560
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Unknown1 = this.readInt()
    this.data.Unknown2 = this.readVInt()

    //console.log(this.data)
  }

  async process () {
    await new OwnHomeDataMessage(this.client).send()
  }
}

module.exports = GoHomeMessage