const config = require('../../config.json')
const crypto = require('node:crypto')
const { blake2bInit, blake2bUpdate, blake2bFinal } = require('blakejs')
const tweetnacl = require('tweetnacl')

function urandom(bytesCount) {
    return new Uint8Array(crypto.randomBytes(bytesCount))
}

class Nonce {
    constructor(nonce = null, clientKey = null, serverKey = null) {
        if (!clientKey) {
            if (nonce) {
                this._nonce = nonce
            } else {
                this._nonce = urandom(24)
            }
        } else {
            const b2 = blake2bInit(24)
            if (nonce) {
                blake2bUpdate(b2, nonce)
            }
            blake2bUpdate(b2, clientKey)
            blake2bUpdate(b2, serverKey)
            this._nonce = blake2bFinal(b2)
        }
    }

    toBytes() {
        return this._nonce
    }

    increment() {
        let carry = 2n
        const newNonce = new Uint8Array(24)
        for (let i = 0; i < 24; i++) {
            const sum = BigInt(this._nonce[i]) + carry
            newNonce[i] = Number(sum & 0xffn)
            carry = sum >> 8n
        }
        this._nonce = newNonce
    }
}

class PepperState {
    static PEPPER_INVALID = -1
    static PEPPER_AUTH = 0
    static PEPPER_LOGIN = 1
    static PEPPER_AUTHENTICATED = 2

    constructor() { throw new Error('Cannot instantiate Enum class') }
}
Object.freeze(PepperState)

class CryptographyError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class PepperEncrypter {
    static CryptographyError = CryptographyError

    constructor() {
        this.state = PepperState.PEPPER_INVALID
        this.server_private_key = new Uint8Array(Buffer.from(config.Server.Crypto.Pepper.ServerSecretKey, 'hex'))
        this.server_public_key = tweetnacl.scalarMult.base(this.server_private_key)
        this.client_public_key = null
        this.session_key = null
        this.decryptNonce = null
        this.encryptNonce = new Nonce(urandom(24))
        this.shared_encryption_key = urandom(32)
        this.nonce = null
        this.s = null
    }

    _equals(a, b) {
        if (!a || !b || a.length !== b.length) return false
        return a.every((val, i) => val === b[i])
    }

    decrypt(packet_id, payload) {
        if (packet_id === 10100) {
            if (this.state !== PepperState.PEPPER_INVALID) {
                throw new CryptographyError('[PepperEncrypter::] Received ClientHelloMessage while not in PEPPER_INVALID state')
            }
            this.state = PepperState.PEPPER_AUTH
            return payload
        } else if (packet_id === 10101) {
            if (this.state !== PepperState.PEPPER_AUTH) {
                throw new CryptographyError('[PepperEncrypter::] Received LoginMessage while not in PEPPER_AUTH state')
            }

            this.client_public_key = payload.subarray(0, 32)

            payload = payload.subarray(32)

            this.nonce = new Nonce(null, this.client_public_key, this.server_public_key)
            
            let byteNonce = this.nonce.toBytes()

            this.s = tweetnacl.box.before(this.client_public_key, this.server_private_key)
            let decrypted = tweetnacl.secretbox.open(payload, byteNonce, this.s)

            if (!decrypted) {
                throw new CryptographyError('Decryption failed! Payload might be tampered with or corrupted.')
            }

            if (!this._equals(decrypted.subarray(0, this.session_key.length), this.session_key)) {
                throw new CryptographyError(`LoginMessage SessionKey does not match with server key! (session key: ${this.session_key.toString('hex')}, decrypted key: ${decrypted.subarray(0, this.session_key.length).toString('hex')})`)
            }

            this.decryptNonce = new Nonce(decrypted.subarray(24, 48))
            this.state = PepperState.PEPPER_LOGIN
            return decrypted.subarray(48)

        } else {
            if (this.state !== PepperState.PEPPER_AUTHENTICATED) {
                throw new CryptographyError('Session is not in PEPPER_AUTHENTICATED state!')
            }
            this.decryptNonce.increment()
            let decryptNonceBytes = this.decryptNonce.toBytes()
            return tweetnacl.secretbox.open(payload, decryptNonceBytes, this.shared_encryption_key)
        }
    }

    encrypt(packetID, payload) {
        switch (this.state) {
            case PepperState.PEPPER_AUTH: {
                if (packetID === 20100) {
                    this.session_key = payload.slice(4)
                    return payload 
                } else if (packetID === 20103) return payload
                throw new CryptographyError('Received packet with type other than 20100, 22280 while PepperState == AUTH')
            }

            case PepperState.PEPPER_LOGIN: {
                let nonce = new Nonce(this.decryptNonce.toBytes(), this.client_public_key, this.server_public_key)
                
                let prefix = this.encryptNonce.toBytes()
                let combinedPayload = new Uint8Array(prefix.length + this.shared_encryption_key.length + payload.length)
                combinedPayload.set(prefix, 0)
                combinedPayload.set(this.shared_encryption_key, prefix.length)
                combinedPayload.set(payload, prefix.length + this.shared_encryption_key.length)

                this.state = PepperState.PEPPER_AUTHENTICATED
                return tweetnacl.secretbox(combinedPayload, nonce.toBytes(), this.s)
            }

            case PepperState.PEPPER_AUTHENTICATED: {
                this.encryptNonce.increment()
                let encryptNonceBytes = this.encryptNonce.toBytes()
                return tweetnacl.secretbox(new Uint8Array(payload), new Uint8Array(encryptNonceBytes), new Uint8Array(this.shared_encryption_key))
            }
            default:
                throw new CryptographyError('Invalid State mapping execution target.')
        }
    }
}


module.exports = {
    PepperEncrypter,
    PepperState,
    Nonce
}