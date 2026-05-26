const PiranhaMessage = require('../../PiranhaMessage')

class UnlockAccountFailedMessage extends PiranhaMessage {
  constructor (client, errorCode) {
    super()
    this.id = 20133
    this.client = client
    this.version = 1
    this.errorCode = errorCode
  }

  async encode () {
    /*
    4 = Invalid
    5 = Unavailable
    10 = Maintenance
    */
   
    this.writeInt(this.errorCode)
  }
}

module.exports = UnlockAccountFailedMessage