const PiranhaMessage = require('../../PiranhaMessage')

class InboxListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27709
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(3) // InboxListCount
    {
      this.writeString('https://images.cults3d.com/SRTpmVRQDqzMXqOmQl8wPTUyEb8=/516x516/filters:no_upscale()/https://fbi.cults3d.com/uploaders/25298172/illustration-file/ccb1ffe5-b21c-471d-a22c-dc3fdda9f55e/465063822_27522622324049372_3765926730117400355_n-removebg-preview.png') // Logo
      this.writeString('<c4>AstralRoyale</c>') // Title
      this.writeString('Private server emulator created by @astralsc on GitHub!') // Description
      this.writeString('Visit Repository') // Button
      this.writeString('https://github.com/Greedycell/AstralRoyale') // URL
      this.writeString('')
      this.writeString('')
      this.writeString('http://<asset_path_update>') // AssetPath

      this.writeString('https://www.nicepng.com/png/full/141-1410330_clash-royale-red-king-logo-red-king-clash.png') // Logo
      this.writeString('<c3>AstralRoyale Discord</c>') // Title
      this.writeString('Join the official AstralRoyale discord server for the latest news!') // Description
      this.writeString('Join Server') // Button
      this.writeString('https://www.discord.gg/mUredE6CTU') // URL
      this.writeString('')
      this.writeString('')
      this.writeString('http://<asset_path_update>') // AssetPath

      this.writeString('https://www.pngkey.com/png/full/435-4357630_renders-de-clash-royale-png.png') // Logo
      this.writeString('<c2>AstralSC YouTube</c>') // Title
      this.writeString('Subscribe to AstralSC for videos or posts!') // Description
      this.writeString('Subscribe') // Button
      this.writeString('https://www.youtube.com/@astral_sc') // URL
      this.writeString('')
      this.writeString('')
      this.writeString('http://<asset_path_update>') // AssetPath*/
    }
  }
}

module.exports = InboxListMessage