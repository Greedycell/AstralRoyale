const PiranhaMessage = require('../../PiranhaMessage')

class InboxListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 27709
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeHex('0000000100000071687474703A2F2F35366632333063366431343261643861393235662D62313734613164386662326366363930376531633734326334363037316437362E7231382E6366322E7261636B63646E2E636F6D2F696E626F782F436C617368526F79616C655F6C6F676F5F736D616C6C2E706E670000003050524F445549545320434C41534820444953504F4E49424C45532044414E53204C45204D4F4E444520454E5449455221000000840A47617264657A2064657320736F7576656E69727320647520636F6D6261742061766563206E6F732076C3AA74656D656E74732C206669677572696E65732C2070656C7563686573206574206175747265732061727469636C65732E2052656E64657A2D766F75732064616E73206C6120626F75746971756520537570657263656C6C210000000B4AE28099792076616973210000001A68747470733A2F2F73686F702E737570657263656C6C2E636F6D00000000000000000000001A687474703A2F2F3C61737365745F706174685F7570646174653E')
    
    //this.writeVInt(0) // How many inbox messages that can show
    
    /*this.writeVInt(3) // How many inbox messages that can show

    this.writeString("https://images.cults3d.com/SRTpmVRQDqzMXqOmQl8wPTUyEb8=/516x516/filters:no_upscale()/https://fbi.cults3d.com/uploaders/25298172/illustration-file/ccb1ffe5-b21c-471d-a22c-dc3fdda9f55e/465063822_27522622324049372_3765926730117400355_n-removebg-preview.png") // Logo
    this.writeString("<c4>AstralRoyale</c>") // Title
    this.writeString("Private server emulator created by @astralsc on GitHub!") // Description
    this.writeString("Visit Repository") // Button
    this.writeString("https://github.com/Greedycell/AstralRoyale") // URL
    this.writeString(null)
    this.writeString(null)
    this.writeString(null) // AssetPath

    // Seperation between inbox messages
    this.writeString("") // Unk
    this.writeString("") // Unk
    this.writeString("") // Unk
    ////////////////////////////////////

    this.writeString("https://www.nicepng.com/png/full/141-1410330_clash-royale-red-king-logo-red-king-clash.png") // Logo
    this.writeString("<c3>AstralRoyale Discord</c>") // Title
    this.writeString("Join the official AstralRoyale discord server for the latest news!") // Description
    this.writeString("Join Server") // Button
    this.writeString("https://www.discord.gg/mUredE6CTU") // URL
    this.writeString(null)
    this.writeString(null)
    this.writeString(null) // AssetPath

    // Seperation between inbox messages
    this.writeString("") // Unk
    this.writeString("") // Unk
    this.writeString("") // Unk
    ////////////////////////////////////

    this.writeString("https://www.pngkey.com/png/full/435-4357630_renders-de-clash-royale-png.png") // Logo
    this.writeString("<c2>AstralSC YouTube</c>") // Title
    this.writeString("Subscribe to AstralSC for videos or posts!") // Description
    this.writeString("Subscribe") // Button
    this.writeString("https://www.youtube.com/@astral_sc") // URL
    this.writeString(null)
    this.writeString(null)
    this.writeString(null) // AssetPath*/
  }
}

module.exports = InboxListMessage