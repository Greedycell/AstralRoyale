const PiranhaMessage = require('../../PiranhaMessage')
const SectorStateMessage = require('../Server/SectorStateMessage')

class StartMissionMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 12393
    this.version = 1
  }

  async decode () {}

  async process () {
    let data = {
      arena: 2
    }
    await new SectorStateMessage(this.client, 0, this.client, null, data).send()
  }
}

module.exports = StartMissionMessage