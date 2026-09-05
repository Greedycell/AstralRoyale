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

    const newToken = await generateToken(8)
    this.client.player.friendToken = newToken
    this.writeString(newToken)
    this.client.player.markModified('friendToken')

    await this.client.player.save()
  }
}

function generateToken(n) {
  return new Promise((resolve, reject) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    require('crypto').randomBytes(n, (err, buffer) => {
      if (err) return reject(err)
      let token = ''
      for (let i = 0; i < buffer.length; i++) {
        token += chars[buffer[i] % chars.length]
      }
      resolve(token)
    })
  })
}

module.exports = GetTokenFriendResultMessage