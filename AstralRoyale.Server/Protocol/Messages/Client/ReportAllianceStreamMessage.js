const PiranhaMessage = require('../../PiranhaMessage')
const ReportUserStatusMessage = require('../Server/ReportUserStatusMessage')

class ReportAllianceStreamMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 13170
    this.version = 1
  }

  async decode () {}

  async process () {
    await new ReportUserStatusMessage(this.client, 1).send()
  }
}

module.exports = ReportAllianceStreamMessage