const RC4 = require('simple-rc4')
const config = require('../config.json')

class CryptoRc4 {
  constructor() {
      this.key = Buffer.from(config.Server.RC4Key)
      this.nonce = Buffer.from('nonce')
      this.RC4_Stream = new RC4(Buffer.concat([this.key, this.nonce]))
      this.RC4_Stream.update(Buffer.concat([this.key, this.nonce]))
      this.RC4_Stream2 =  new RC4(Buffer.concat([this.key, this.nonce]))
      this.RC4_Stream2.update(Buffer.concat([this.key, this.nonce]))
  }

  decrypt(data) {
      const decryptedData = this.RC4_Stream.update(data)
      return decryptedData
  }

  encrypt(data) {
      const encryptedData = this.RC4_Stream2.update(data)
      return encryptedData
  }
}

module.exports = CryptoRc4