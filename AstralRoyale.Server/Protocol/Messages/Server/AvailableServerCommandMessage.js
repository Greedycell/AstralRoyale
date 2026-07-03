const PiranhaMessage = require('../../PiranhaMessage')
const LogicLeaveAllianceCommand = require('../../Commands/Server/LogicLeaveAllianceCommand')
const LogicJoinAllianceCommand = require('../../Commands/Server/LogicJoinAllianceCommand')
const LogicChangeAllianceRoleCommand = require('../../Commands/Server/LogicChangeAllianceRoleCommand')
const LogicGameRoomJoinedCommand = require('../../Commands/Server/LogicGameRoomJoinedCommand')
const LogicClaimRewardCommand = require('../../Commands/Server/LogicClaimRewardCommand')
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
      290: LogicLeaveAllianceCommand,
      263: LogicJoinAllianceCommand,
      206: LogicChangeAllianceRoleCommand,
      248: LogicGameRoomJoinedCommand,
      278: LogicChangeAvatarNameCommand,
      393: LogicClaimRewardCommand
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