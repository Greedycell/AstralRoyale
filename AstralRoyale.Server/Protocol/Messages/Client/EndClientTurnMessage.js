const PiranhaMessage = require('../../PiranhaMessage')
const ChangeDeckCardCommand = require('../../Commands/Client/ChangeDeckCardCommand')
const OpenFreeChestCommand = require('../../Commands/Client/OpenFreeChestCommand')
const SelectDeckCommand = require('../../Commands/Client/SelectDeckCommand')
const AskForChestDataCommand = require('../../Commands/Client/AskForChestDataCommand')
const StartTournamentMatchmakingCommand = require('../../Commands/Client/StartTournamentMatchmakingCommand')
const BuyShopChestCommand = require('../../Commands/Client/BuyShopChestCommand')
const BuyChestCommand = require('../../Commands/Client/BuyChestCommand')
const BuyShopItemCommand = require('../../Commands/Client/BuyShopItemCommand')
const UpgradeCardCommand = require('../../Commands/Client/UpgradeCardCommand')
const StartMatchmakingCommand = require('../../Commands/Client/StartMatchmakingCommand')
const OpenCrownChestCommand = require('../../Commands/Client/OpenCrownChestCommand')

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
      505: ChangeDeckCardCommand,
      510: OpenFreeChestCommand,
      512: SelectDeckCommand,
      518: AskForChestDataCommand,
      504: StartTournamentMatchmakingCommand,
      539: BuyShopChestCommand,
      543: BuyChestCommand,
      544: BuyShopItemCommand,
      592: UpgradeCardCommand,
      594: StartMatchmakingCommand,
      595: OpenCrownChestCommand
    }

    this.data.CommandID = 594

    if (!String(this.data.CommandID).startsWith('-')) {
      if (this.data.CommandID > 499 && this.data.CommandID < 600) {
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