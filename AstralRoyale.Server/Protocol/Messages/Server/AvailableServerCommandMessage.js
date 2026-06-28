const PiranhaMessage = require('../../PiranhaMessage')
const LogicLeaveAllianceCommand = require('../../Commands/Server/LogicLeaveAllianceCommand')
const LogicJoinAllianceCommand = require('../../Commands/Server/LogicJoinAllianceCommand')
const LogicChangeAllianceRoleCommand = require('../../Commands/Server/LogicChangeAllianceRoleCommand')
const LogicChestDataCommand = require('../../Commands/Server/LogicChestDataCommand')
const LogicChangeAvatarNameCommand = require('../../Commands/Server/LogicChangeAvatarNameCommand')

class AvailableServerCommandMessage extends PiranhaMessage {
  constructor (client, commandID, data) {
    super()
    this.id = 23394
    this.client = client
    this.version = 1
    this.commandID = commandID
    this.data = data
  }

  async encode () {
    var commands = {
      205: LogicLeaveAllianceCommand,
      206: LogicJoinAllianceCommand,
      207: LogicChangeAllianceRoleCommand,
      278: LogicChangeAvatarNameCommand,
      393: LogicChestDataCommand
    }

    if (this.commandID in commands) {
      const command = new commands[this.commandID]()
      this.writeVInt(this.commandID)
      await command.encode(this)
      this.client.log(`Gotcha ${this.commandID} (${command.constructor.name}) command!`)
    }
    else {
      this.client.log(`Gotcha undefined ${this.commandID} packet!`)
    }
  }
}

module.exports = AvailableServerCommandMessage