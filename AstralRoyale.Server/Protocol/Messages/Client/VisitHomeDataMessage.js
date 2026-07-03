const PiranhaMessage = require('../../PiranhaMessage')
const VisitedHomeDataMessage = require('../Server/VisitedHomeDataMessage')

class VisitHomeDataMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 19860
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.HighID = this.readInt()
    this.data.LowID = this.readInt()

    //console.log(this.data)
  }

  async process () {
    await new VisitedHomeDataMessage(this.client, this.data.HighID, this.data.LowID).send()
  }
}

module.exports = VisitHomeDataMessage