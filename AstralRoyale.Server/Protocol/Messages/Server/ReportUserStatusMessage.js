const PiranhaMessage = require('../../PiranhaMessage')

class ReportUserStatusMessage extends PiranhaMessage {
  constructor (client, errorCode) {
    super()
    this.id = 21989
    this.client = client
    this.version = 1
    this.errorCode = errorCode
  }

  async encode () {
    /*
    1 = Sent
    2 = Too much sent
    3 = Already reported
    6 = Too much clan reports sent(?)
    7 = Already reported(?)
    */

    this.writeInt(this.errorCode)
  }
}

module.exports = ReportUserStatusMessage