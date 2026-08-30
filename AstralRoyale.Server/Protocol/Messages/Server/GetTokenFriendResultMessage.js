const PiranhaMessage = require('../../PiranhaMessage')

class GetTokenFriendResultMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 22089
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeBoolean(true)

    generateToken(8, newToken => {
      this.client.player.friendToken = newToken
      this.writeString(newToken)
      //console.log(newToken)

      this.client.player.markModified('friendToken')
    })

    await this.client.player.save()
  }
}

function generateToken(n, callback) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  require('crypto').randomBytes(n, (err, buffer) => {
    if (err) throw err
    let token = ''
    for (let i = 0; i < buffer.length; i++) {
      token += chars[buffer[i] % chars.length]
    }
    callback(token)
  })
}

module.exports = GetTokenFriendResultMessage