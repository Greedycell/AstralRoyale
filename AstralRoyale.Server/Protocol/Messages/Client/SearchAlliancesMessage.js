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
    this.data.LocationClassID = this.readVInt()
    this.data.LocationInstanceID = this.readVInt()
    this.data.MinimumMembers = this.readInt()
    this.data.MaximumMembers = this.readInt()
    this.data.MinimumRequiredTrophies = this.readInt()
    this.data.CanJoin = this.readBoolean()

    //console.log(this.data)
  }

  async process() {
    await new AllianceListMessage(this.client, this.data).send()
  }
}

module.exports = SearchAlliancesMessage