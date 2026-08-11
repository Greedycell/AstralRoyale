const PiranhaMessage = require('../../PiranhaMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')
const LoginOkMessage = require('../Server/LoginOkMessage')
const OwnHomeDataMessage = require('../Server/OwnHomeDataMessage')
const StopHomeLogicMessage = require('../../Messages/Server/StopHomeLogicMessage')
const UdpConnectionInfoMessage = require('../../Messages/Server/UdpConnectionInfoMessage')
const SectorStateMessage = require('../Server/SectorStateMessage')
const InboxCountMessage = require('../Server/InboxCountMessage')
const AllianceStreamMessage = require('../Server/AllianceStreamMessage')
const AllianceOnlineStatusUpdatedMessage = require('../Server/AllianceOnlineStatusUpdatedMessage')

const config = require('../../../config.json')

const LogicBattle = require('../../../Core/LogicBattle')

class LoginMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10101
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.HighID = this.readInt()
    this.data.LowID = this.readInt()
    this.data.Token = this.readString()
    this.data.Major = this.readVInt()
    this.data.Build = this.readVInt()
    this.data.Content = this.readVInt()
    this.data.FingerprintSHA = this.readString()

    //console.log(this.data)
  }

  async process () {
    if (config.Server.MaintenanceEnabled == true) {
      if (!config.Server.Admins.includes(this.data.LowID)) { // only give maintenance to non admins
        await new LoginFailedMessage(this.client, 10, '', config.Server.MaintenanceSeconds).send()
        return
      }
    }

    if (config.Server.Banned.includes(this.data.LowID)) {
      await new LoginFailedMessage(this.client, 11).send()
      return
    }

    if (this.data.FingerprintSHA !== config.Server.Fingerprint) {
      if (config.Server.ContentPatchEnabled === true) {
        await new LoginFailedMessage(this.client, 7, config.Server.Fingerprint).send()
        return
      }
    }

    this.client.userObject = Object.assign({}, {
      highID: this.data.HighID,
      lowID: this.data.LowID,
      token: this.data.Token
    })

    const playerModel = this.client.mongoose?.mongoosePlayers
    let player = null

    if (playerModel) {
      player = await playerModel.findOne({
        highID: this.data.HighID,
        lowID: this.data.LowID,
        token: this.data.Token
      })

      if (!player) {
        player = await playerModel.findOne({
          highID: this.data.HighID,
          lowID: this.data.LowID
        })
      }

      if (!player && this.data.LowID) player = await playerModel.findOne({ lowID: this.data.LowID })
      if (!player && this.data.Token) player = await playerModel.findOne({ token: this.data.Token })
    }

    if (player?.switchAccountTarget) {
      const targetPlayer = playerModel ? await playerModel.findOne({ lowID: player.switchAccountTarget }) : null
      if (targetPlayer) {
        this.data.HighID = targetPlayer.highID
        this.data.LowID = targetPlayer.lowID
        this.data.Token = targetPlayer.token

        this.client.userObject = Object.assign({}, {
          highID: this.data.HighID,
          lowID: this.data.LowID,
          token: this.data.Token
        })

        player.switchAccountTarget = 0
        player.switchAccountToken = ''
        player.markModified('switchAccountTarget')
        player.markModified('switchAccountToken')
        await player.save()

        player = targetPlayer
      }
    }

    if (!player) {
      this.client.mongoose.getPlayer(this.client, async (err, createdPlayer) => {
        if (err) {
          console.log(err)
          return
        }
        player = createdPlayer
        await this.login(player)
      })
      return
    }

    await this.login(player)
  }

  async login(player) {
    this.client.player = player
    this.client.userObject = Object.assign({}, {
      highID: player.highID,
      lowID: player.lowID,
      token: player.token
    })

    if (player.switchAccountTarget) {
      const targetPlayer = this.client.mongoose?.mongoosePlayers ? await this.client.mongoose.mongoosePlayers.findOne({ lowID: player.switchAccountTarget }) : null
      if (targetPlayer) {
        this.client.player = targetPlayer
        this.client.userObject = Object.assign({}, {
          highID: targetPlayer.highID,
          lowID: targetPlayer.lowID,
          token: targetPlayer.token
        })

        this.data.HighID = targetPlayer.highID
        this.data.LowID = targetPlayer.lowID
        this.data.Token = targetPlayer.token

        player.switchAccountTarget = 0
        player.switchAccountToken = ''
        player.markModified('switchAccountTarget')
        player.markModified('switchAccountToken')
        await player.save()

        this.client.player = targetPlayer
        player = targetPlayer
      }
    }

    if (this.client.player.accountLocked === 1) {
      await new LoginFailedMessage(this.client, 13).send()
      return
    }

    await new LoginOkMessage(this.client).send()
    if (this.client.player.battleID == 0) {
      await new OwnHomeDataMessage(this.client).send()
      await new InboxCountMessage(this.client).send()
      if (this.client.player.inClan) {
        await new AllianceStreamMessage(this.client).send()
        await new AllianceOnlineStatusUpdatedMessage(this.client).send()
      }
    } else {
      const activeBattle = LogicBattle.getBattleById(this.client.player.battleID)
      if (activeBattle) {
        await activeBattle.rejoinClient(this.client)
        return
      }
    }
  }
}

module.exports = LoginMessage
