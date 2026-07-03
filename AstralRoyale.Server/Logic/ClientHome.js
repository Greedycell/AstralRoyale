const cardUtils = require('../Utils/cardUtils')
const utils = require('../Utils')

class ClientHome {
  async encode (self) {
    self.writeLong(self.client.player.highID, self.client.player.lowID) // HighID, LowID
    self.writeVInt(14)
    self.writeVInt(0)
    self.writeVInt(1727700)
    self.writeVInt(1727700)
    self.writeVInt(Date.now() / 1000 | 0)
    self.writeVInt(0)

    self.writeVInt(self.client.player.decks.length)
    self.client.player.decks.forEach(deck => {
        self.writeVInt(deck.length)
        deck.forEach(card => {
            self.writeVInt(card)
        })
    })

    self.writeByte(0xFF)
    let currentDeck = self.client.player.decks[self.client.player.selectedDeck]
    currentDeck.forEach(cardSCID => {
        let card = utils.findObjectByKey(self.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))

        self.writeVInt(card.ID ?? 0)
        self.writeVInt(card.level ?? 1)
        self.writeVInt(0)
        self.writeVInt(card.xpPoints ?? 0)
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(0)
    })

    self.writeVInt(self.client.player.cards.length - 8)

    self.client.player.cards.forEach(card => {
        if (!currentDeck.includes(cardUtils.instanceIDtoSCID(card.ID))) {
            self.writeVInt(card.ID)
            self.writeVInt(card.level)
            self.writeVInt(0)
            self.writeVInt(card.xpPoints)
            self.writeVInt(0)
            self.writeVInt(0)
            self.writeVInt(0)
            self.writeVInt(0)
        }
    })

    self.writeVInt(self.client.player.selectedDeck)
    self.writeVInt(0)

    self.writeByte(127)
    self.writeByte(127)
    self.writeByte(127)
    self.writeVInt(Date.now() / 1000 | 0)
    self.writeVInt(1)
    self.writeVInt(0)

    self.writeVInt(6) // EventCount
    {
        self.writeVInt(1109)
        self.writeString('2v2 Button')
        self.writeVInt(8)
        if (self.client.player.tutorialStage === 7) {
            self.writeVInt(1503298800)
            self.writeVInt(1534834800)
            self.writeVInt(1502694000)
        }
        else {
            self.writeVInt(0)
            self.writeVInt(-1)
            self.writeVInt(0)
        }
        self.writeInt(0)
        self.writeInt(0)
        self.writeString('2v2 Button')
        self.writeString('{"HideTimer":true,"HidePopupTimer":true,"ExtraGameModeChance":0,"GameMode":"TeamVsTeamLadder","ExtraGameMode":"None"}')
        self.writeByte(0)

        self.writeVInt(1305)
        self.writeString('1v1 Draft Friendly ')
        self.writeVInt(5)
        self.writeVInt(1503298800)
        self.writeVInt(1534834800)
        self.writeVInt(1502694000)
        self.writeInt(0)
        self.writeInt(0)
        self.writeString('1v1 Draft Friendly ')
        self.writeString('{"Title":"Draft Friendly Battle","Subtitle":"","GameMode":"DraftMode","Background":{"Path":"/62ce7186-d295-4100-9b4e-58d86d3a854c_friendly_draft.png","Checksum":"71c0065635a551b109400a766cbdabfc","File":"friendly_draft.png"},"DraftDeck":"Draft_v1"}')
        self.writeByte(0)

        self.writeVInt(1343)
        self.writeString('Clash Royale League Challenge Header')//to start again
        self.writeVInt(13)
        self.writeVInt(1521014400)
        self.writeVInt(1521446400)
        self.writeVInt(1521014400)
        self.writeInt(0)
        self.writeInt(0)
        self.writeString('Clash Royale League Challenge Header')
        self.writeString('{"Image":{"Path":"/5231460d-4307-4a3e-b989-8bbf2e6f8db7_cr_league_challenge_header.png","Checksum":"45440c7c948e9175f69030bde7d2c630","File":"cr_league_challenge_header.png"},"TitleGlow":true,"Icon":"icon_tournament_special_grand","Title":"Clash Royale League"}')
        self.writeByte(0)

        self.writeVInt(1344)
        self.writeString('Clash Royale League Challenge')
        self.writeVInt(2)
        self.writeVInt(1521014400)
        self.writeVInt(1521446400)
        self.writeVInt(1520841600)
        self.writeInt(0)
        self.writeInt(0)
        self.writeString('Clash Royale League Challenge')
        self.writeString('{"GameMode":"Challenge","Title":"Clash Royale League Challenge","FreePass":3,"JoinCost":10,"JoinCostResource":"Gems","MaxLosses":3,"Rewards":[{"Gold":20,"Cards":2},{"Gold":30,"Cards":3},{"Gold":50,"Milestone":{"Type":"Gold","Amount":500},"Cards":5},{"Gold":80,"Cards":8},{"Gold":120,"Milestone":{"Type":"RandomSpell","Amount":15,"RandomSpell":"Rare"},"Cards":12},{"Gold":170,"Cards":17},{"Gold":230,"Milestone":{"Type":"Gold","Amount":1500},"Cards":23},{"Gold":300,"Cards":30},{"Gold":380,"Milestone":{"Chest":"Giant_<max_arena>","Type":"Chest"},"Cards":38},{"Gold":470,"Cards":47},{"Gold":570,"Milestone":{"Type":"Gold","Amount":5000},"Cards":57},{"Gold":680,"Cards":68},{"Gold":800,"Milestone":{"Chest":"Magic_<max_arena>","Type":"Chest"},"Cards":80},{"Gold":930,"Cards":93},{"Gold":1070,"Milestone":{"Type":"Gold","Amount":10000},"Cards":107},{"Gold":1220,"Cards":122},{"Gold":1400,"Milestone":{"Type":"RandomSpell","Amount":10,"RandomSpell":"Epic"},"Cards":140},{"Gold":1650,"Cards":165},{"Gold":2000,"Milestone":{"Chest":"Legendary","Type":"Chest"},"Cards":200},{"Gold":2450,"Cards":245},{"Gold":3000,"Milestone":{"IsHighlighted":true,"Type":"Gold","Amount":200000},"Cards":300}],"IconExportName":"icon_tournament_special_grand","WinIconExportName":"tournament_open_wins_badge_gold","Subtitle":"Ecco come funziona","Description":"Arriva la Clash Royale League: la tua occasione per diventare un giocatore professionista! Raggiungi 20 vittorie per proseguire nella competizione. Troverai altre informazioni nella tua posta in arrivo in gioco!","Background":{"Path":"/da8810e1-e57c-4d9e-a854-9dd41b38fd81_cr_league_challenge.png","Checksum":"a1d8b04a8e911ed1e21b0aba5cb25b85","File":"cr_league_challenge.png"},"Background_Complete":{"Path":"/da8810e1-e57c-4d9e-a854-9dd41b38fd81_cr_league_challenge.png","Checksum":"3e1910cc44d36e1bacbb2b26ec3b51cf","File":"cr_league_challenge.png"},"UnlockedForXP":"Experienced","EndNotification":"La sfida Clash Royale League termina tra 2 ore!"}')
        self.writeByte(0)

        self.writeVInt(1345)
        self.writeString('Boosts')
        self.writeVInt(10)
        self.writeVInt(1503298800)
        self.writeVInt(1534834800) // 2147483647
        self.writeVInt(1503298800)
        self.writeInt(0)
        self.writeInt(0)
        self.writeString('Boosts')
        self.writeString('{"Title":"Gold Boost","Boosts":[{"Type":"VictoryGold","durationInHours":168,"Cost":300},{"Type":"CrownChestCards","durationInHours":168,"Cost":300},{"Type":"ChestSpeedUp","durationInHours":168,"Cost":300}]}')
        self.writeByte(0)

        self.writeVInt(1346)
        self.writeString('Barbarian Barrel Draft Challenge ')
        self.writeVInt(2)
        self.writeVInt(1521792000)
        self.writeVInt(1522051200)
        self.writeVInt(1521705600)
        self.writeInt(0)
        self.writeInt(0)
        self.writeString('Barbarian Barrel Draft Challenge ')
        self.writeString('{"Casual":false,"GameMode":"CardReleaseDraft","Title":"Barbarian Barrel Draft Challenge","FreePass":1,"JoinCost":100,"JoinCostResource":"Gems","MaxLosses":3,"Rewards":[{"Gold":700,"Cards":10},{"Gold":950,"Cards":15},{"Gold":1250,"Milestone":{"Type":"Gold","Amount":1000},"Cards":25},{"Gold":1600,"Cards":43},{"Gold":2000,"Milestone":{"Type":"RandomSpell","Amount":20,"RandomSpell":"Rare"},"Cards":65},{"Gold":2500,"Cards":93},{"Gold":3100,"Milestone":{"Type":"Gold","Amount":3000},"Cards":125},{"Gold":3800,"Cards":165},{"Gold":4650,"Milestone":{"Chest":"Giant_<max_arena>","Type":"Chest"},"Cards":210},{"Gold":5750,"Cards":265},{"Gold":7100,"Milestone":{"Type":"Gold","Amount":9000},"Cards":335},{"Gold":8750,"Cards":430},{"Gold":11000,"Milestone":{"IsHighlighted":true,"Type":"Spell","Amount":10,"Spell":"BarbLog"},"Cards":550}],"CardTheme":"BarbLog","IconExportName":"icon_tournament_card_release_grand","WinIconExportName":"tournament_open_wins_badge_gold","Arena":"All","Description":"Scegli 4 carte e ricevine 4 dall\'avversario: uno dei due potrÃ  schierare il barile barbarico! Sblocca la nuova carta con 12 vittorie, ma occhio: con 3 sconfitte sei fuori!","EndNotification":"La sfida strategica barile barbarico termina tra due ore! Prova a sbloccare la nuova carta!","StartNotification":"La sfida strategica barile barbarico Ã¨ iniziata! Sblocca subito una nuova carta!","UnlockedForXP":"Experienced","DraftDeck":"Draft_v1","DraftDeckCardThemeSetOverride":"Draft_AllRandom","Subtitle":"Ecco come funziona","Subtitle_Short":"Sblocca una nuova carta!","Background":{"Path":"/78096e87-fc08-434f-8387-93a51be1b27e_barbarian_barrel_challenge.png","Checksum":"62bc57e2a6827d434c0ce8a604c3f586","File":"barbarian_barrel_challenge.png"},"Background_Complete":{"Path":"/78096e87-fc08-434f-8387-93a51be1b27e_barbarian_barrel_challenge.png","Checksum":"25c6e25d7f322acef312ab50b009b68c","File":"barbarian_barrel_challenge.png"}}')
        self.writeByte(0)
    }

    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)


    self.writeByte(127)
    self.writeByte(127)
    self.writeByte(127)
    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(0)

    self.writeVInt(6) // EventCount
    {
        self.writeVInt(1109)
        self.writeVInt(1)

        self.writeVInt(1305)
        self.writeVInt(1)

        self.writeVInt(1343)
        self.writeVInt(1)

        self.writeVInt(1344)
        self.writeVInt(1)

        self.writeVInt(1345)
        self.writeVInt(1)

        self.writeVInt(1346)
        self.writeVInt(1)
    }

    self.writeVInt(6) // EventCount
    {
        self.writeVInt(1109)
        self.writeVInt(2)
        self.writeVInt(0)

        self.writeVInt(1305)
        self.writeVInt(2)
        self.writeVInt(0)

        self.writeVInt(1343)
        self.writeVInt(3)
        self.writeVInt(0)

        self.writeVInt(1344)
        self.writeVInt(3)
        self.writeVInt(0)

        self.writeVInt(1345)
        self.writeVInt(3)
        self.writeVInt(0)

        self.writeVInt(1346)
        self.writeVInt(1)
        self.writeVInt(0)
    }

    self.writeVInt(1)

    self.writeString('{"ID":"SHOP_CYCLE_MANAGEMENT","Params":{"LegendaryChestCycleDuration":14}}}')
    self.writeVInt(1)
    self.writeString('{"ID":"CARD_RELEASE_V2","Params":{"Cards":[]}}')
    self.writeVInt(4)
    self.writeString('{"ID":"CLAN_CHEST","Params":{"StartTime":"20170317T070000.000Z","ActiveDuration":"P3dT0h","InactiveDuration":"P4dT0h","ChestType":["ClanCrowns"]}}')
    self.writeVInt(1)
    self.writeString('{"ID":"PERMANENT_GAME_MODES","Params":{"FixedDeckOrderOptionEnabled":true}}')

    self.writeVInt(4) //Chest Slots Count
    if (self.client.player.chests && self.client.player.chests.length > 0 && self.client.player.chests.length <= 4) {
        self.writeVInt(1)
        self.client.player.chests.forEach(chest => {
            self.writeVInt(19)
            self.writeVInt(chest.chestID)

            {
                /*
                // 0  - Not opened
                // 2  - Opened
                // 4  - ???
                // 6  - Opened but locked
                // 8  - New chest with animation
                // 10 - New chest with animation and already opened
                // 12 - New chest with animation and closed
                // 14 - New chest with animation, opened but locked
                // 16 - Currently unlocking
                */
                self.writeVInt(0)             
            }

            self.writeVInt(self.client.player.chests.indexOf(chest) * 2 + 4) //Chest Index
            self.writeVInt(6)

            self.writeVInt(self.client.player.chests.indexOf(chest))
            self.writeVInt(0)
            self.writeVInt(0)
            if (self.client.player.chests) {
                self.writeVInt(self.client.player.chests.indexOf(chest) === (self.client.player.chests.length - 1) ? 0 : 8)
            }
        })
    }
    else {
        self.writeVInt(0)
    }

    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(Date.now() / 1000 | 0)
    self.writeVInt(0)
    self.writeVInt(0)
    self.writeByte(127)

    self.writeVInt(1)
    self.writeVInt(19)
    self.writeVInt(7)
    self.writeVInt(2)
    self.writeVInt(2)
    self.writeVInt(0)
    self.writeByte(127)

    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)




    self.writeVInt(self.client.player.crownChestCount) // CrownChestCount
    self.writeVInt(0)

    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(Date.now() / 1000 | 0)
    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(Date.now() / 1000 | 0)

    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(0)
    self.writeByte(127)

    self.writeVInt(2817)

    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)

    self.writeVInt((Date.now() / 1000 | 0) + 100) // CurrentTimestemp
    self.writeVInt(127)
    self.writeVInt(self.client.player.nameChangesCount ? 3 : 1) // 1 = Name Set, 2 = Upgrade Card, 3 = Name already set 
    self.writeVInt(0)
    self.writeVInt(2)

    self.writeVInt(self.client.player.level) // OldLevel
    self.writeVInt(55)
    self.writeVInt(self.client.player.arena) // OldArena
    self.writeVInt(5)
    self.writeVInt(447)
    self.writeVInt(5)
    self.writeVInt(1736000) // Time left until the card shop refreshes (1736000)
    self.writeVInt(0)
    self.writeVInt(Date.now() / 1000 | 0)

    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(0)
    self.writeByte(127)

    self.writeVInt(0)
    self.writeVInt(0)
    self.writeByte(127)

    self.writeVInt(0)
    self.writeVInt(0)
    self.writeByte(127)

    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(1)

    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)

    self.writeVInt(10)
    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(0)

    self.writeHex('F807')
    self.client.player.decks[self.client.player.selectedDeck].forEach(cardSCID => {
        let card = utils.findObjectByKey(self.client.player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))

        self.writeVInt(card.ID)
        self.writeVInt(card.level)
        self.writeVInt(0)
        self.writeVInt(card.xpPoints)
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(0)
    })

    self.writeVInt(1)
    self.writeVInt(26)
    self.writeVInt(62)
    self.writeVInt(1)
    self.writeVInt(26)
    self.writeVInt(62)

    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)

    self.writeVInt(1)
    self.writeVInt(Date.now() / 1000 | 0)

    self.writeVInt(0)
    self.writeVInt(0)
    self.writeVInt(1)

    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)

    self.writeVInt(2)
    self.writeVInt(1)
    self.writeVInt(2)
    self.writeVInt(1)
    self.writeVInt(0)
    self.writeVInt(0)

    // Quests
    {
        self.writeHex('0000000F5449445F4441494C595F4749465453000000000300000000001151756573745F4672656547696674733130000000145449445F465245455F43484553545F51554553540000000873632F75692E73630000001571756573745F6974656D5F667265655F636865737405031307011307010501900103000000030004040000020100000000155449445F4C41444445525F51554553545F504C4159000000000A01000000001A506C61795F51756573745F506C61795F4C61646465725F5076500000001A5449445F4C41444445525F51554553545F504C41595F494E464F0000000873632F75692E73630000000E71756573745F6974656D5F70767014010E000A0000010100000032010000BF060201000301000000000000000000000000000000')
    }

    // Shop
    {
        self.writeVInt(14)
        self.writeVInt(4)
        self.writeVInt(0)
        self.writeVInt(4)
        self.writeVInt(1)
        self.writeVInt(4)
        self.writeVInt(1)
        self.writeVInt(4)
        self.writeVInt(0)
        self.writeVInt(5)
        self.writeVInt(2)
        self.writeVInt(4)
        self.writeVInt(0)
        self.writeVInt(4)
        self.writeVInt(2)
        self.writeVInt(4)
        self.writeVInt(0)
        self.writeVInt(5)
        self.writeVInt(0)
        self.writeVInt(2)
        self.writeVInt(0)
        self.writeVInt(4)
        self.writeVInt(3)
        self.writeVInt(4)
        self.writeVInt(2)
        self.writeVInt(5)
        self.writeVInt(3)
        self.writeVInt(2)
        self.writeVInt(3)
        self.writeVInt(1)
        self.writeVInt(8)
        self.writeByte(127)
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(5)
        self.writeVInt(3)
        self.writeVInt(3)

        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(447)
        self.writeVInt(0) // Cost
        self.writeVInt(5) // SCID Res Type - Resources
        self.writeVInt(1) // SCID Res ID - Gold
        self.writeVInt(19) // SCID Res Type - Chests
        self.writeVInt(114) // SCID Res ID - Chest ID
        self.writeVInt(0)
        self.writeVInt(1)

        self.writeVInt(0)
        self.writeVInt(1)
        self.writeVInt(447)
        self.writeVInt(50)
        self.writeVInt(5)
        self.writeVInt(1)
        self.writeVInt(26)
        self.writeVInt(0)
        self.writeVInt(5)
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(3000)
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(1)

        self.writeVInt(0)
        self.writeVInt(2)
        self.writeVInt(447)
        self.writeVInt(100)
        self.writeVInt(5)
        self.writeVInt(1)
        self.writeVInt(28)
        self.writeVInt(0)
        self.writeVInt(1)
        self.writeVInt(1)
        self.writeVInt(0)
        self.writeVInt(3000)
        self.writeVInt(0)
        self.writeVInt(0)
    }

    // Shop Chests
    {
        self.writeVInt(3) //ChestsCount

        // #1
        self.writeVInt(19)
        self.writeVInt(306)
        self.writeVInt(88)
        self.writeVInt(0)
        self.writeString('Lightning')
        self.writeVInt(447)
        self.writeVInt(0)//Chest index
        self.writeVInt(0)
        self.writeByte(127)
        self.writeVInt(0)
        self.writeByte(127)

        // #2
        self.writeVInt(19)
        self.writeVInt(318)
        self.writeVInt(88)
        self.writeVInt(1)
        self.writeString('Fortune')
        self.writeVInt(447)
        self.writeVInt(1)//Chest index
        self.writeVInt(0)
        self.writeByte(127)
        self.writeVInt(0)
        self.writeByte(127)

        // #3
        self.writeVInt(19)
        self.writeVInt(330)
        self.writeVInt(88)
        self.writeVInt(3)
        self.writeString('Kings')
        self.writeVInt(447)
        self.writeVInt(2)//Chest index
        self.writeVInt(0)
        self.writeByte(127)
        self.writeVInt(0)
        self.writeByte(127)
    }

    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)
    self.writeByte(0)


    self.writeByte(127)
    self.writeVInt(1109)
    self.writeVInt(0)
    self.writeVInt(0)
  }
}

module.exports = ClientHome