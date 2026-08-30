const fs = require('fs')
const path = require('path')

const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const AvatarNameChangeFailedMessage = require('../Server/AvatarNameChangeFailedMessage')
const AvatarNameCheckResponseMessage = require('../Server/AvatarNameCheckResponseMessage')
const config = require('../../../config.json')

const filter = fs.readFileSync(path.join(__dirname, '../../../filter.json'), 'utf8').split(/\r?\n/).filter(word => word.length > 0)
function containsFilteredWord (name) {
  if (!config.Server.WordFilter) return false
  return filter.some(word => {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(escapedWord, 'i').test(name)
  })
}

class AvatarNameCheckRequestMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14315
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Name = this.readString()
    this.data.ChangeState = this.readVInt()

    //console.log(this.data)
  }

  async process () {
    if (this.client.player.nameChangesCount > 1) {
      return
    }
    if (this.data.Name.length < 2 || this.data.Name.length > 15) {
      return
    }
    if (containsFilteredWord(this.data.Name)) {
      await new AvatarNameChangeFailedMessage(this.client).send()
      return
    }

    await new AvatarNameCheckResponseMessage(this.client, 0).send()
  }
}

module.exports = AvatarNameCheckRequestMessage