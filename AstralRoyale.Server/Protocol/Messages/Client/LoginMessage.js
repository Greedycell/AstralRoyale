const PiranhaMessage = require('../../PiranhaMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')
const LoginOkMessage = require('../Server/LoginOkMessage')
const OwnHomeDataMessage = require('../Server/OwnHomeDataMessage')
const SectorStateMessage = require('../Server/SectorStateMessage')
const config = require('../../../config.json')

class LoginMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10101
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.HighID = this.readInt()
    this.data.LowID = this.readInt()
    this.data.Token = this.readString()
    this.data.Major = this.readVInt()
    this.data.Build = this.readVInt()
    this.data.Content = this.readVInt()
    this.data.FingerprintSHA = this.readString()

    //console.log(this.data)
  }

  async process () {
    if (config.Server.MaintenanceEnabled == true) {
      if (!config.Server.Admins.includes(this.data.LowID)) { // only give maintenance to non admins
        await new LoginFailedMessage(this.client, 10, '', config.Server.MaintenanceSeconds).send()
        return
      }
    }

    if (config.Server.Banned.includes(this.data.LowID)) {
      await new LoginFailedMessage(this.client, 11).send()
      return
    }

    if (this.data.FingerprintSHA !== config.Server.Fingerprint) {
      if (config.Server.ContentPatchEnabled === true) {
        await new LoginFailedMessage(this.client, 7, config.Server.Fingerprint).send()
        return
      }
    }

    this.client.userObject = Object.assign({}, {
      highID: this.data.HighID,
      lowID: this.data.LowID,
      token: this.data.Token
    })
    this.client.mongoose.getPlayer(this.client, async (err, player) => {
      this.client.player = player
      if (this.client.player.accountLocked === 1) {
        await new LoginFailedMessage(this.client, 13).send()
        return
      }
      
      await new LoginOkMessage(this.client).send()
      await new OwnHomeDataMessage(this.client).send()
      
      //await new SectorStateMessage(this.client, 1, this.client).send()
    })
  }
}

module.exports = LoginMessage