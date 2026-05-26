const PiranhaMessage = require('../../PiranhaMessage')
const UnlockAccountOkMessage = require('../Server/UnlockAccountOkMessage')
const UnlockAccountFailedMessage = require('../Server/UnlockAccountFailedMessage')

class UnlockAccountMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 18902
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.HighID = this.readInt()
    this.data.LowID = this.readInt()
    this.data.Token = this.readString()
    this.data.UnlockCode = this.readString()

    //console.log(this.data)
  }

  async process () {
    await new UnlockAccountOkMessage(this.client).send()
    //await new UnlockAccountFailedMessage(this.client, 4).send()
  }
}

module.exports = UnlockAccountMessage