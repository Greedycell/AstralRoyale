const PiranhaMessage = require('../../PiranhaMessage')

class AllianceCreateFailedMessage extends PiranhaMessage {
  constructor (client, code) {
    super()
    this.id = 27720
    this.client = client
    this.version = 1
    this.code = code
  }

  async encode () {
    /*
    Codes:
    1 = Invalid name
    2 = Invalid description
    3 = Short name
    */
    this.writeVInt(this.code)
  }
}

module.exports = AllianceCreateFailedMessage