const PiranhaMessage = require('../../PiranhaMessage')

class AvatarNameCheckResponseMessage extends PiranhaMessage {
  constructor (client, code) {
    super()
    this.id = 25350
    this.client = client
    this.version = 1
    this.code = code
  }

  async encode () {
    /*
    0 = Success
    */
    this.writeVInt(this.code)
  }
}

module.exports = AvatarNameCheckResponseMessage