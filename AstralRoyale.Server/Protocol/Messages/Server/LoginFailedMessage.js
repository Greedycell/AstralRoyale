const PiranhaMessage = require('../../PiranhaMessage')
const config = require('../../../config.json')

class LoginFailedMessage extends PiranhaMessage {
  constructor (client, errorCode, reason, maintenanceSeconds) {
    super()
    this.id = 20103
    this.client = client
    this.version = 4
    this.errorCode = errorCode
    this.reason = reason
    this.maintenanceSeconds = maintenanceSeconds
  }

  async encode () {
    /*
    3 = Custom Message
    7 = Content Update
    8 = Update Available
    9 = Redirection
    10 = Maintenance
    11 = Banned
    13 = Locked
    16 = UpdateInProgress
    */
   
    this.writeVInt(this.errorCode) // ErrorCode
    this.writeString(config.Server.Fingerprint) // Fingerprint
    this.writeString(config.Server.RedirectionURL) // Redirect
    this.writeString(config.Server.UpdateURL) // UpdateURL
    this.writeString(this.reason) // Reason
    //this.writeByte(127)
    this.writeVInt(this.maintenanceSeconds) // MaintenanceSeconds
    this.writeString(null) // UpdateURL
    this.writeVInt(2) // URLCount
    this.writeString(config.Server.UpdateURL) // GameAssetsURL
    this.writeString(config.Server.ContentURL) // ContentURL
  }
}

module.exports = LoginFailedMessage