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
    const aid = this.data.AllianceID || [0, 0]
    await new AllianceDataMessage(this.client, aid[0], aid[1]).send()
  }
}

module.exports = AskForAllianceDataMessage