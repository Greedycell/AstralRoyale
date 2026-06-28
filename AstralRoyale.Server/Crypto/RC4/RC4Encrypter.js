const RC4 = require('simple-rc4')
const config = require('../../config.json')

/**
 * RC4Encrypter.
 * 
 * Decoding and encoding packets with RC4 crypto.
 */
class RC4Encrypter {
  constructor () {
    this.key = Buffer.from(config.Server.Crypto.RC4.Key)
    this.nonce = Buffer.from(config.Server.Crypto.RC4.Nonce)
    this.encryptStream = new RC4(Buffer.concat([this.key, this.nonce]))
    this.encryptStream.update(Buffer.concat([this.key, this.nonce]))
    this.decryptStream = new RC4(Buffer.concat([this.key, this.nonce]))
    this.decryptStream.update(Buffer.concat([this.key, this.nonce]))
  }

  /**
   * Decrypting packet bytes
   * @param { Buffer } bytes Encrypted packet bytes
   * @returns { Buffer } Decrypted packet bytes
   */
  decrypt (data) {
    const decryptedData = this.decryptStream.update(data)
    return decryptedData
  }

  /**
   * Encrypting packet bytes
   * @param { Buffer } bytes Decrypted packet bytes
   * @returns { Buffer } Encrypted packet bytes
   */
  encrypt (data) {
    const encryptedData = this.encryptStream.update(data)
    return encryptedData
  }
}

module.exports = RC4Encrypter