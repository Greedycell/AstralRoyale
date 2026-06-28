const PiranhaMessage = require('../../PiranhaMessage')
const AllianceListMessage = require('../Server/AllianceListMessage')

class SearchAlliancesMessage extends PiranhaMessage {
  constructor(bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10949
    this.version = 1
  }

  async decode() {
    this.data = {}

    this.data.ClanString = this.readString()

    //console.log(this.data)
  }

  async process() {
    await new AllianceListMessage(this.client, this.ClanString).send()
  }
}

module.exports = SearchAlliancesMessage