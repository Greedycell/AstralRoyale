const PiranhaMessage = require('../../PiranhaMessage')

class LoginOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22280
    this.client = client
    this.version = 4
  }

  async encode () {
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
    this.writeString(this.client.player.token) // Token
    this.writeString(null) // GamecenterId
    this.writeString(null) // FacebookId
    this.writeVInt(3) // ServerMajorVersion
    this.writeVInt(830) // ServerBuild
    this.writeVInt(830) // ServerBuild
    this.writeVInt(0) // ContentVersion
    this.writeString('prod') // ServerEnvironment
    this.writeVInt(0) // PlayTimeSeconds
    this.writeVInt(0) // SessionCount
    this.writeVInt(0) // DaysSinceStartedPlaying
    this.writeString('1475268786112433') // FacebookAppId
    this.writeString(Date.now().toString()) // ServerTime
    this.writeString(Date.now().toString()) // AccountCreatedDate
    this.writeVInt(0) // StartupCooldownSeconds
    this.writeByte(0)
    this.writeString('')
    this.writeString('')
    this.writeString('')
    this.writeString('IT') // State
    this.writeString('CR City') // City
    this.writeString('20') // CountryCode
    this.writeVInt(1)
    this.writeVInt(455500)
    this.writeVInt(115500)
    this.writeVInt(2)
    this.writeString('') // GameAssetsURL
    this.writeString('https://game-assets.clashroyaleapp.com') // GameAssetsURL
    this.writeVInt(1)
    this.writeString('') // EventAssetsURL
  }
}

module.exports = LoginOkMessage