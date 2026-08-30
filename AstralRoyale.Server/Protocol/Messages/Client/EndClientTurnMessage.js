const PiranhaMessage = require('../../PiranhaMessage')
const LogicAllianceSettingsChangedCommand = require('../../Commands/Server/LogicAllianceSettingsChangedCommand')
const LogicSwapSpellsCommand = require('../../Commands/Client/LogicSwapSpellsCommand')
const LogicClaimQuestRewardCommand = require('../../Commands/Client/LogicClaimQuestRewardCommand')
const LogicSelectDeckCommand = require('../../Commands/Client/LogicSelectDeckCommand')
const LogicSpellPageOpenedCommand = require('../../Commands/Client/LogicSpellPageOpenedCommand')
const LogicRefreshAchievementsCommand = require('../../Commands/Client/LogicRefreshAchievementsCommand')
const LogicStartSurvivalMatchmakeCommand = require('../../Commands/Client/LogicStartSurvivalMatchmakeCommand')
const LogicCollectFreeChestCommand = require('../../Commands/Client/LogicCollectFreeChestCommand')
const LogicCreateGameRoomCommand = require('../../Commands/Client/LogicCreateGameRoomCommand')
const LogicKickAllianceMemberCommand = require('../../Commands/Client/LogicKickAllianceMemberCommand')
const LogicBuyChestCommand = require('../../Commands/Client/LogicBuyChestCommand')
const LogicStartSurvivalCommand = require('../../Commands/Client/LogicStartSurvivalCommand')
const LogicStartExploringCommand = require('../../Commands/Client/LogicStartExploringCommand')
const LogicSpeedUpExploringCommand = require('../../Commands/Client/LogicSpeedUpExploringCommand')
const LogicBuyShopCycleItemCommand = require('../../Commands/Client/LogicBuyShopCycleItemCommand')
const LogicRequestSpellsCommand = require('../../Commands/Client/LogicRequestSpellsCommand')
const LogicCopyDeckCommand = require('../../Commands/Client/LogicCopyDeckCommand')
const LogicUpgradeSpellCommand = require('../../Commands/Client/LogicUpgradeSpellCommand')
const LogicStartMatchmakeCommand = require('../../Commands/Client/LogicStartMatchmakeCommand')
const LogicCollectMultiWinChestCommand = require('../../Commands/Client/LogicCollectMultiWinChestCommand')
const LogicStartRewardClaimCommand = require('../../Commands/Client/LogicStartRewardClaimCommand')

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
      517: LogicSpellPageOpenedCommand,
      518: LogicRefreshAchievementsCommand,
      504: LogicStartSurvivalMatchmakeCommand,
      516: LogicCollectFreeChestCommand,
      533: LogicCreateGameRoomCommand,
      537: LogicKickAllianceMemberCommand,
      539: LogicBuyChestCommand,
      542: LogicStartExploringCommand,
      543: LogicSpeedUpExploringCommand,
      544: LogicBuyShopCycleItemCommand,
      551: LogicRequestSpellsCommand,
      580: LogicCopyDeckCommand,
      592: LogicUpgradeSpellCommand,
      594: LogicStartMatchmakeCommand,
      595: LogicCollectMultiWinChestCommand,
      597: LogicStartRewardClaimCommand
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