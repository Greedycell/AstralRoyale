const cardUtils = require('../Utils/cardUtils')
const utils = require('../Utils')

const events = require('../events.json')

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
        self.writeVInt(card.ID)
        self.writeVInt(card.level)
        self.writeVInt(0)
        self.writeVInt(card.xpPoints)
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

    self.writeVInt(events.length) // EventCount
    for (const event of events) {
        self.writeVInt(event.Id)
        self.writeString(event.Name)
        self.writeVInt(event.Type)
        self.writeVInt(event.StartTime)
        self.writeVInt(event.EndTime)
        self.writeVInt(event.DisplayTime)
        self.writeInt(event.Unknown1)
        self.writeInt(event.Unknown2)
        self.writeString(event.Title)
        self.writeString(JSON.stringify(event.Data))
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

    self.writeVInt(events.length) // EventCount
    for (const event of events) {
        self.writeVInt(event.Id)
        self.writeVInt(1)
    }

    self.writeVInt(events.length) // EventCount
    for (const event of events) {
        self.writeVInt(event.Id)
        self.writeVInt(event.Type)
        self.writeVInt(0)
    }

    self.writeVInt(1)
    self.writeString('{"ID":"SHOP_CYCLE_MANAGEMENT","Params":{"LegendaryChestCycleDuration":14}}}')
    self.writeVInt(1)
    self.writeString('{"ID":"CARD_RELEASE_V2","Params":{"Cards":[]}}')
    self.writeVInt(4)
    //self.writeString('{"ID":"CLAN_CHEST","Params":{"StartTime":"20170317T070000.000Z","ActiveDuration":"P3dT0h","InactiveDuration":"P4dT0h","ChestType":["ClanCrowns"]}}')
    self.writeString('{"ID":"CLAN_CHEST","Params":{"StartTime":"20370317T070000.000Z","ActiveDuration":"P3dT0h","InactiveDuration":"P4dT0h","ChestType":["ClanCrowns"]}}')
    self.writeVInt(1)
    self.writeString('{"ID":"PERMANENT_GAME_MODES","Params":{"FixedDeckOrderOptionEnabled":true}}')

    self.writeVInt(4) // ChestSlotCount
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