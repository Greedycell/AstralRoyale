const fs = require('fs')
const path = require('path')

const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const AvatarNameChangeFailedMessage = require('../Server/AvatarNameChangeFailedMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')
const config = require('../../../config.json')

const filter = fs.readFileSync(path.join(__dirname, '../../../filter.json'), 'utf8').split(/\r?\n/).filter(word => word.length > 0)
function containsFilteredWord (name) {
  if (!config.Server.WordFilter) return false
  return filter.some(word => {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(escapedWord, 'i').test(name)
  })
}

class ChangeAvatarNameMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 19863
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Name = this.readString()

    //console.log(this.data)
  }

  async process () {
    if (this.client.player.nameChangesCount > 1) {
      await new OutOfSyncMessage(this.client).send()
      return
    }
    if (this.data.Name.length < 2 || this.data.Name.length > 15) {
      await new OutOfSyncMessage(this.client).send()
      return
    }
    if (containsFilteredWord(this.data.Name)) {
      await new AvatarNameChangeFailedMessage(this.client).send()
      return
    }

    this.client.player.name = this.data.Name
    this.client.player.nameChangesCount += 1

    this.client.player.markModified('name')
    this.client.player.markModified('nameChangesCount')
    await this.client.player.save()

    await new AvailableServerCommandMessage(this.client, 278).send()

    //this.client.destroy()
  }
}

module.exports = ChangeAvatarNameMessage