const PiranhaMessage = require('../../PiranhaMessage')
const cardUtils = require('../../../Utils/cardUtils')
const utils = require('../../../Utils')
const config = require('../../../config.json')

class SectorStateMessage extends PiranhaMessage {
  constructor (client, battleType, enemy) {
    super()
    this.id = 21873
    this.client = client
    this.client2 = client
    this.version = 1
    this.battleType = battleType
    this.enemy = enemy

    this.kingTowerHP = [
        2400, 2568, 2736, 2904, 3096, 3312, 3528, 3768, 4008, 4392, 4824, 5304, 5832
    ]

    this.duoKingTowerHP = [
        2880, 3082, 3284, 3485, 3716, 3975, 4234, 4522, 4810, 5271, 5789, 6365, 6999
    ]

    this.princessTowerHP = [
        1400, 1512, 1624, 1750, 1890, 2030, 2184, 2352, 2534, 2786, 3052, 3346, 3668
    ]
  }

  async encode () {
    switch (this.battleType) {
      case 0: // NPC
        this.writeVInt(0) // IsCompressed
        this.writeHex('012A02020100017F7F7F7F0000000000000100000000000000000000000000000800000000000000000100000000000000000000000102')
        
        this.writeLogicLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
        this.writeLogicLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
        this.writeLogicLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
        this.writeString(this.client.player.name)

        this.writeHex('199F368606A31D000000000029000000000008130501BB97040502AB10050302050400050C8C14050D00050E00050F98110516B21105199487979707051A04051C00051D8A88D5440521000522000523000524000526000525000000000505068F3C05078D0F050B2905140B051B0B011A320C00000B0202B8DB01000000')
        
        // Alliance
        {
          this.InClan = 0
          
          if (this.InClan === 1) {
            this.writeByte(8) // InClan
            this.writeHex('6920506167757269') // AllianceName
          }
          else {
            this.writeByte(0) // InClan
          }
        }

        this.writeHex('9201BE5193080094249023019F0318000000002B00217F0B0007037BF994EABEEA090229017F7F00')
        
        this.writeVInt(this.client.player.highID)
        this.writeVInt(this.client.player.lowID)
        
        this.writeHex('0000000000000000000601000009000000010000008E02F27D0000067A06230123012301230123002300010001000001050005010502050305040505')
        
        // RightPrincessTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        
        this.writeHex('A4E2019C8E0300007F00C07C000002000000000000090DAC36A46500007F008004000001000000000000')
        
        // LeftPrincessTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeHex('AC369C8E0300007F00C07C000001000000000000090DA4E201A46500007F008004000002000000000000090DA88C01B82E00007F00800400000000000000001A04047C067F0407030201007F7F7F007F00000500000000007F7F7F7F7F7F7F7F00000000')
        
        // PlayerKingTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeHex('A88C0188C50300007F00C07C00000000000000001A04067C027D0407000305007F7F7F007F0000')
        
        this.writeVInt(config.Player.StartingBattleMana) // StartingElixir

        this.writeHex('00000000007F7F7F7F7F7F7F7F00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000AC2F00A22B00AC2F00A22B00A84400984B0000000000A40100000000A40100000000A40100000000A40100000000A40100000000A401')
        
        // Trainer Deck
        this.writeHex('FF01')
        this.writeHex('190B8F010B090B2102200B140A10051F0A')
        /*let trainerDeck = this.client.player.decks[this.client.player.selectedDeck]
        trainerDeck.forEach(cardSCID => {
            let card = utils.findObjectByKey(this.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))
            this.writeVInt(card.ID)
            this.writeVInt(card.level)
        })*/

        this.writeVInt(0)

        // Own Deck
        this.writeHex('FF01')
        let currentDeck = this.client.player.decks[this.client.player.selectedDeck]
        currentDeck.forEach(cardSCID => {
            let card = utils.findObjectByKey(this.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))
            this.writeVInt(card.ID)
            this.writeVInt(card.level)
        })

        this.writeVInt(0)
        this.writeHex('05060202040201030000000000000000000204000C00000093E5BFB00D00')

        break

      case 1: // 1v1
        let towers = 6

        this.writeByte(0) // IsCompressed

        this.writeBoolean(true)
        this.writeVInt(42)
        this.writeVInt(2)
        this.writeBoolean(false)
        this.writeBoolean(true)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(2)
        this.writeVInt(1)
        this.writeBoolean(false)
        this.writeStringReference(null)
        this.writeStringReference(null)
        this.writeVInt(10)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(null)
        
        this.writeBoolean(true)
        this.writeVInt(null)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(2)
        
        this.writeStringReference(null)
        this.writeVInt(5)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(29)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(41)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(8)
        this.writeVInt(10)
        this.writeVInt(5)
        this.writeVInt(1)
        this.writeVInt(187)
        this.writeVInt(5)
        this.writeVInt(2)
        this.writeVInt(6)
        this.writeVInt(5)
        this.writeVInt(3)
        this.writeVInt(2)
        this.writeVInt(5)
        this.writeVInt(4)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(13)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(14)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(28)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(29)
        this.writeVInt(72000008)
        this.writeVInt(5)
        this.writeVInt(38)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(37)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(4)
        this.writeVInt(5)
        this.writeVInt(6)
        this.writeVInt(30)
        this.writeVInt(5)
        this.writeVInt(7)
        this.writeVInt(1)
        this.writeVInt(5)
        this.writeVInt(11)
        this.writeVInt(41)
        this.writeVInt(5)
        this.writeVInt(27)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(-1)
        this.writeVInt(5)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(1)
        this.writeBoolean(false)

        this.writeBoolean(true)
        this.writeLogicLong(null, null) // HighID, LowID
        this.writeLogicLong(null, null) // HighID, LowID
        this.writeLogicLong(null, null) // HighID, LowID
        this.writeString(this.enemy.name)
        this.writeVInt(this.enemy.level) // Level
        this.writeVInt(this.enemy.trophies) // Opponent Trophies
        
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(41)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(8)
        this.writeVInt(9)
        this.writeVInt(5)
        this.writeVInt(1)
        this.writeVInt(213)
        this.writeVInt(5)
        this.writeVInt(2)
        this.writeVInt(6)
        this.writeVInt(5)
        this.writeVInt(3)
        this.writeVInt(2)
        this.writeVInt(5)
        this.writeVInt(13)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(14)
        this.writeVInt(5)
        this.writeVInt(5)
        this.writeVInt(29)
        this.writeVInt(72000006)
        this.writeVInt(5)
        this.writeVInt(37)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(4)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(28)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(4)
        this.writeVInt(5)
        this.writeVInt(11)
        this.writeVInt(41)
        this.writeVInt(5)
        this.writeVInt(27)
        this.writeVInt(1)
        this.writeVInt(5)
        this.writeVInt(7)
        this.writeVInt(1)
        this.writeVInt(5)
        this.writeVInt(6)
        this.writeVInt(30)
        this.writeVInt(null)

        if (this.enemy.inClan === 1) {
          /*let clan = null
          if (this.client && this.client.mongoose && typeof this.client.mongoose.getClanByID === 'function') {
              try {
                  clan = await this.client.mongoose.getClanByID(this.enemy.clan.ClanHighID, this.enemy.clan.ClanLowID)
              } catch (e) {
                  console.error(e)
                  clan = null
              }
          }
          this.writeVInt(2) // Has Clan = 2
          this.writeLogicLong(this.enemy.clan.ClanHighID, this.enemy.clan.ClanLowID)
          this.writeString(clan ? String(clan.name || '') : '')
          this.writeVInt(clan.badge + 1)*/

          this.writeVInt(0)
        } else {
          this.writeVInt(0)
        }

        this.writeVInt(0) // 0 = 1v1, 3 = 2v2
        this.writeVInt(1) // Count
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(5)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(1)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(43)
        this.writeVInt(null)
        this.writeVInt(33)
        this.writeVInt(15000013) // Location (old = 1522160491)
        this.writeVInt(11)
        this.writeVInt(null)
        this.writeInt(229645219)
        this.writeVInt(1742068539)
        this.writeVInt(3) // ArenaData
        
        this.writeLogicLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
        this.writeLogicLong(this.enemy.highID, this.enemy.lowID) // HighID, LowID
        this.writeVInt(0)

        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(7) // Gamemode
        this.writeVInt(null)
        this.writeVInt(null)
        
        this.writeBoolean(false) // IsTournament
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeBoolean(false) // IsOvertime
        this.writeBoolean(false) // IsLiveReplay

        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(249)
        this.writeVInt(-249)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(6)
        this.writeVInt(-6)
        this.writeVInt(6)

        this.writeDataReference(35, 1)
        this.writeDataReference(35, 1)
        this.writeDataReference(35, 1)
        this.writeDataReference(35, 1)
        this.writeDataReference(35, 0)
        this.writeDataReference(35, 0)

        // LogicGameObject::encodeComponent
        this.writeVInt(1)
        this.writeVInt(0)
        this.writeVInt(1)
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(1)

        for (var i = 0; i < towers; i++)
        {
            this.writeVInt(5)
            this.writeVInt(i)
        }

        // EnemyLeftPrincessTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(14500)
        this.writeVInt(25500)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(-256)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)

        // RightPrincessTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(3500)
        this.writeVInt(6500)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(256)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)

        // EnemyRightPrincessTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(3500)
        this.writeVInt(25500)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(-256)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)

        // LeftPrincessTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(14500)
        this.writeVInt(6500)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(256)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)

        // KingTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(9000)
        this.writeVInt(3000)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(256)
        for (let i = 0; i < 6; i++) this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeBoolean(true)
        this.writeBoolean(false)
        this.writeBoolean(true)
        this.writeBoolean(true)
        this.writeVInt(4)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(-1)
        this.writeVInt(3)
        this.writeVInt(4)
        this.writeVInt(6)
        this.writeVInt(2)
        this.writeVInt(3)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(-1)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(5)
        for (let i = 0; i < 5; i++) this.writeVInt(null)
        for (let i = 0; i < 8; i++) this.writeVInt(-1)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)

        // EnemyKingTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(9000)
        this.writeVInt(29000)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(-256)
        for (let i = 0; i < 6; i++) this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeBoolean(true)
        this.writeBoolean(true)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(5)
        for (let i = 0; i < 5; i++) this.writeVInt(null)
        for (let i = 0; i < 8; i++) this.writeVInt(-1)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)

        for (let i = 0; i < 6; i++) {
          this.writeBoolean(false)
          this.writeBoolean(false)
          for (let j = 0; j < 7; j++) {
            this.writeVInt(null)
          }
        }
        
        // LogicHitpointComponent
        this.writeVInt(1400) // LeftPrincessTowerHealth
        this.writeVInt(0)
        this.writeVInt(1400) // EnemyLeftPrincessTowerHealth
        this.writeVInt(0)
        this.writeVInt(1400) // LeftPrincessTowerHealth
        this.writeVInt(0)
        this.writeVInt(1400) // EnemyRightPrincessTowerHealth
        this.writeVInt(0)
        this.writeVInt(2400) // EnemyKingTowerHealth
        this.writeVInt(0)
        this.writeVInt(2400) // KingTowerHealth
        this.writeVInt(0)

        // LogicCharacterBuffComponent
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(100)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(100)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(100)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(100)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(100)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(36)
        
        // Deck
        this.writeHex('FF01')
        let playerDeck = this.client.player.decks[this.client.player.selectedDeck]
        playerDeck.forEach(cardSCID => {
            let card = utils.findObjectByKey(this.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))
            this.writeVInt(card.ID)
            this.writeVInt(card.level)
        })

        this.writeVInt(0)

        this.writeBoolean(false)
        this.writeVInt(5)
        this.writeVInt(6)
        this.writeVInt(2)
        this.writeVInt(2)
        this.writeVInt(4)
        this.writeVInt(2)
        this.writeVInt(1)
        this.writeVInt(3)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(12)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(245431292)
        this.writeVInt(null)
        
        break

      case 2: // 2v2
        let duoTowers = 10

        this.writeByte(0) // IsCompressed

        this.writeBoolean(true)
        this.writeVInt(42)
        this.writeVInt(2)
        this.writeBoolean(false)
        this.writeBoolean(true)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(2)
        this.writeVInt(1)
        this.writeBoolean(false)
        this.writeStringReference(null)
        this.writeStringReference(null)
        this.writeVInt(10)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(null)
        
        this.writeBoolean(true)
        this.writeVInt(null)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(2)
        
        this.writeStringReference(null)
        this.writeVInt(5)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(29)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(41)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(8)
        this.writeVInt(10)
        this.writeVInt(5)
        this.writeVInt(1)
        this.writeVInt(187)
        this.writeVInt(5)
        this.writeVInt(2)
        this.writeVInt(6)
        this.writeVInt(5)
        this.writeVInt(3)
        this.writeVInt(2)
        this.writeVInt(5)
        this.writeVInt(4)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(13)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(14)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(28)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(29)
        this.writeVInt(72000008)
        this.writeVInt(5)
        this.writeVInt(38)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(37)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(4)
        this.writeVInt(5)
        this.writeVInt(6)
        this.writeVInt(30)
        this.writeVInt(5)
        this.writeVInt(7)
        this.writeVInt(1)
        this.writeVInt(5)
        this.writeVInt(11)
        this.writeVInt(41)
        this.writeVInt(5)
        this.writeVInt(27)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(-1)
        this.writeVInt(5)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(1)
        this.writeBoolean(false)

        this.writeBoolean(true)
        this.writeLogicLong(null, null) // HighID, LowID
        this.writeLogicLong(null, null) // HighID, LowID
        this.writeLogicLong(null, null) // HighID, LowID
        this.writeString(this.enemy.name)
        this.writeVInt(1) // Level
        this.writeVInt(this.enemy.trophies) // Opponent Trophies
        
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(41)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(8)
        this.writeVInt(9)
        this.writeVInt(5)
        this.writeVInt(1)
        this.writeVInt(213)
        this.writeVInt(5)
        this.writeVInt(2)
        this.writeVInt(6)
        this.writeVInt(5)
        this.writeVInt(3)
        this.writeVInt(2)
        this.writeVInt(5)
        this.writeVInt(13)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(14)
        this.writeVInt(5)
        this.writeVInt(5)
        this.writeVInt(29)
        this.writeVInt(72000006)
        this.writeVInt(5)
        this.writeVInt(37)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(4)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(28)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(4)
        this.writeVInt(5)
        this.writeVInt(11)
        this.writeVInt(41)
        this.writeVInt(5)
        this.writeVInt(27)
        this.writeVInt(1)
        this.writeVInt(5)
        this.writeVInt(7)
        this.writeVInt(1)
        this.writeVInt(5)
        this.writeVInt(6)
        this.writeVInt(30)
        this.writeVInt(null)

        if (this.enemy.inClan === 1) {
          /*let clan = null
          if (this.client && this.client.mongoose && typeof this.client.mongoose.getClanByID === 'function') {
              try {
                  clan = await this.client.mongoose.getClanByID(this.enemy.clan.ClanHighID, this.enemy.clan.ClanLowID)
              } catch (e) {
                  console.error(e)
                  clan = null
              }
          }
          this.writeVInt(2) // Has Clan = 2
          this.writeLogicLong(this.enemy.clan.ClanHighID, this.enemy.clan.ClanLowID)
          this.writeString(clan ? String(clan.name || '') : '')
          this.writeVInt(clan.badge + 1)*/

          this.writeVInt(0)
        } else {
          this.writeVInt(0)
        }

        this.writeVInt(3) // 0 = 1v1, 3 = 2v2
        this.writeVInt(1) // Count
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(5)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(1)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(43)
        this.writeVInt(null)
        this.writeVInt(33)
        this.writeVInt(15000013) // Location (old = 1522160491)
        this.writeVInt(11)
        this.writeVInt(null)
        this.writeInt(229645219)
        this.writeVInt(1742068539)
        this.writeVInt(3) // ArenaData
        
        this.writeLogicLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
        this.writeLogicLong(this.enemy.highID, this.enemy.lowID) // HighID, LowID
        this.writeLogicLong(this.enemy.highID, this.enemy.lowID) // HighID, LowID
        this.writeLogicLong(this.enemy.highID, this.enemy.lowID) // HighID, LowID
        this.writeVInt(0)

        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(15) // Gamemode
        this.writeVInt(null)
        this.writeVInt(null)
        
        this.writeBoolean(false) // IsTournament
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeBoolean(false) // IsOvertime
        this.writeBoolean(false) // IsLiveReplay

        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(249)
        this.writeVInt(-249)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(10)
        this.writeVInt(-10)
        this.writeVInt(10)

        // KingTower
        this.writeDataReference(35, 1)
        this.writeDataReference(35, 1)
        this.writeDataReference(35, 1)
        this.writeDataReference(35, 1)
        // PrincessTower
        this.writeDataReference(35, 0)
        this.writeDataReference(35, 0)
        this.writeDataReference(35, 0)
        this.writeDataReference(35, 0)
        // KingTowerMiddle
        this.writeDataReference(35, 16)
        this.writeDataReference(35, 16)

        // LogicGameObject::encodeComponent
        this.writeVInt(1)
        this.writeVInt(2)
        this.writeVInt(3)
        this.writeVInt(0)
        this.writeVInt(0)
        this.writeVInt(1)
        this.writeVInt(2)
        this.writeVInt(3)
        this.writeVInt(1)
        this.writeVInt(0)

        for (var i = 0; i < duoTowers; i++)
        {
            this.writeVInt(5)
            this.writeVInt(i)
        }

        // EnemyLeftPrincessTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(14500)
        this.writeVInt(25500)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(-256)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)

        // RightPrincessTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(3500)
        this.writeVInt(6500)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(256)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)

        // EnemyRightPrincessTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(3500)
        this.writeVInt(25500)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(-256)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)

        // LeftPrincessTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(14500)
        this.writeVInt(6500)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(256)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(2)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)

        // KingTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(9000)
        this.writeVInt(3000)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(256)
        for (let i = 0; i < 6; i++) this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeBoolean(true)
        this.writeBoolean(false)
        this.writeBoolean(true)
        this.writeBoolean(true)
        this.writeVInt(4)
        this.writeVInt(null)
        this.writeVInt(5)
        this.writeVInt(-1)
        this.writeVInt(3)
        this.writeVInt(4)
        this.writeVInt(6)
        this.writeVInt(2)
        this.writeVInt(3)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(-1)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(5)
        for (let i = 0; i < 5; i++) this.writeVInt(null)
        for (let i = 0; i < 8; i++) this.writeVInt(-1)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)

        // EnemyKingTower
        this.writeVInt(0) // Level
        this.writeVInt(13)
        this.writeVInt(9000)
        this.writeVInt(29000)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(-1)
        this.writeVInt(null)
        this.writeVInt(-256)
        for (let i = 0; i < 6; i++) this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeBoolean(true)
        this.writeBoolean(true)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(5)
        for (let i = 0; i < 5; i++) this.writeVInt(null)
        for (let i = 0; i < 8; i++) this.writeVInt(-1)
        this.writeBoolean(false)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)

        for (let i = 0; i < 6; i++) {
          this.writeBoolean(false)
          this.writeBoolean(false)
          for (let j = 0; j < 7; j++) {
            this.writeVInt(null)
          }
        }
        
        // LogicHitpointComponent
        this.writeVInt(2352)
        this.writeVInt(0)

        this.writeVInt(2352)
        this.writeVInt(0)

        this.writeVInt(2352)
        this.writeVInt(0)

        this.writeVInt(2352)
        this.writeVInt(0)

        this.writeVInt(4522)
        this.writeVInt(0)

        this.writeVInt(4522)
        this.writeVInt(0)

        this.writeVInt(4522)
        this.writeVInt(0)

        this.writeVInt(4522)
        this.writeVInt(0)
        
        // Deck
        this.writeHex('FF01')
        let playerOneDeck = this.client.player.decks[this.client.player.selectedDeck]
        playerOneDeck.forEach(cardSCID => {
            let card = utils.findObjectByKey(this.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))
            this.writeVInt(card.ID)
            this.writeVInt(card.level)
        })

        this.writeHex('FE01')
        let playerTwoDeck = this.client.player.decks[this.client.player.selectedDeck]
        playerTwoDeck.forEach(cardSCID => {
            let card = utils.findObjectByKey(this.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))
            this.writeVInt(card.ID)
            this.writeVInt(card.level)
        })

        this.writeHex('FE02')
        let playerThreeDeck = this.client.player.decks[this.client.player.selectedDeck]
        playerThreeDeck.forEach(cardSCID => {
            let card = utils.findObjectByKey(this.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))
            this.writeVInt(card.ID)
            this.writeVInt(card.level)
        })

        this.writeHex('FE03')
        let playerFourDeck = this.client.player.decks[this.client.player.selectedDeck]
        playerFourDeck.forEach(cardSCID => {
            let card = utils.findObjectByKey(this.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))
            this.writeVInt(card.ID)
            this.writeVInt(card.level)
        })

        this.writeVInt(0)

        this.writeBoolean(false)
        this.writeVInt(5)
        this.writeVInt(6)
        this.writeVInt(2)
        this.writeVInt(2)
        this.writeVInt(4)
        this.writeVInt(2)
        this.writeVInt(1)
        this.writeVInt(3)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeBoolean(false)
        this.writeVInt(null)
        this.writeVInt(1)
        this.writeVInt(1)
        this.writeVInt(null)
        this.writeVInt(12)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(null)
        this.writeVInt(245431292)
        this.writeVInt(null)

        break

      default: 
        console.warn('Gotcha unknown BattleType:', this.battleType)
    }
  }
}

module.exports = SectorStateMessage