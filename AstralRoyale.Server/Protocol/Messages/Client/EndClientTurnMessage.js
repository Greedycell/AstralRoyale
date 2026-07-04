const PiranhaMessage = require('../../PiranhaMessage')
const LogicAllianceSettingsChangedCommand = require('../../Commands/Server/LogicAllianceSettingsChangedCommand')
const LogicSwapSpellsCommand = require('../../Commands/Client/LogicSwapSpellsCommand')
const LogicClaimQuestRewardCommand = require('../../Commands/Client/LogicClaimQuestRewardCommand')
const LogicSelectDeckCommand = require('../../Commands/Client/LogicSelectDeckCommand')
const LogicRefreshAchievementsCommand = require('../../Commands/Client/LogicRefreshAchievementsCommand')
const LogicStartSurvivalMatchmakeCommand = require('../../Commands/Client/LogicStartSurvivalMatchmakeCommand')
const LogicCreateGameRoomCommand = require('../../Commands/Client/LogicCreateGameRoomCommand')
const LogicKickAllianceMemberCommand = require('../../Commands/Client/LogicKickAllianceMemberCommand')
const LogicBuyChestCommand = require('../../Commands/Client/LogicBuyChestCommand')
const LogicStartSurvivalCommand = require('../../Commands/Client/LogicStartSurvivalCommand')
const LogicSpeedUpExploringCommand = require('../../Commands/Client/LogicSpeedUpExploringCommand')
const LogicBuyShopCycleItemCommand = require('../../Commands/Client/LogicBuyShopCycleItemCommand')
const LogicCopyDeckCommand = require('../../Commands/Client/LogicCopyDeckCommand')
const LogicUpgradeSpellCommand = require('../../Commands/Client/LogicUpgradeSpellCommand')
const LogicStartMatchmakeCommand = require('../../Commands/Client/LogicStartMatchmakeCommand')
const LogicCollectMultiWinChestCommand = require('../../Commands/Client/LogicCollectMultiWinChestCommand')

class EndClientTurnMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 18688
    this.version = 1
  }

  async decode () {
    this.data = {}
    
    this.data.Tick = this.readVInt()
    this.data.Checksum = this.readVInt()
    this.data.Count = this.readVInt()
    this.data.CommandID = this.readVInt()

    //console.log(this.data)
  }

  async process () {
    var Commands = {
      341: LogicAllianceSettingsChangedCommand,
      505: LogicSwapSpellsCommand,
      509: LogicStartSurvivalMatchmakeCommand,
      510: LogicClaimQuestRewardCommand,
      512: LogicSelectDeckCommand,
      518: LogicRefreshAchievementsCommand,
      504: LogicStartSurvivalMatchmakeCommand,
      533: LogicCreateGameRoomCommand,
      537: LogicKickAllianceMemberCommand,
      539: LogicBuyChestCommand,
      543: LogicSpeedUpExploringCommand,
      544: LogicBuyShopCycleItemCommand,
      580: LogicCopyDeckCommand,
      592: LogicUpgradeSpellCommand,
      594: LogicStartMatchmakeCommand,
      595: LogicCollectMultiWinChestCommand
    }

    if (!String(this.data.CommandID).startsWith('-')) {
      if (this.data.CommandID > 422 && this.data.CommandID < 600) {
        if (this.data.CommandID in Commands) {
          var command = new Commands[this.data.CommandID]
          this.client.log(`Command ${this.data.CommandID} (${command.constructor.name}) handled!`)
          command.decode(this)
          command.process(this)
        }
        else {
          this.client.log(`Command ${this.data.CommandID} isn't handled!`)
        }
      }
    }
  }
}

module.exports = EndClientTurnMessage