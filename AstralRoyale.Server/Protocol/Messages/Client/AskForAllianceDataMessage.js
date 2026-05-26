const PiranhaMessage = require('../../PiranhaMessage')
const AllianceDataMessage = require('../Server/AllianceDataMessage')

class AskForAllianceDataMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10609
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.AllianceID = this.readLong()

    //console.log(this.data)
  }

  async process () {
    await new AllianceDataMessage(this.client).send()
  }
}

module.exports = AskForAllianceDataMessage