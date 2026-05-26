const PiranhaMessage = require('../../PiranhaMessage')

class ChangeAllianceSettingsMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10587
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Description = this.readString()
    this.data.Badge = this.readVInt()
    this.data.Type = this.readVInt()
    this.data.RequiredScore = this.readVInt()
    this.data.Location = this.readVInt()

    //console.log(this.data)
  }

  async process () {
  }
}

module.exports = ChangeAllianceSettingsMessage