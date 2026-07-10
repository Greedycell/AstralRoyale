const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../config.json')

//Creating schema
const playersSchema = new Schema({
    highID: {
        type: Number,
        required: true
    },
    lowID: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: ''
    },
    accountLocked: {
        type: Number,
        default: 0
    },
    nameChangesCount: {
        type: Number,
        default: 0
    },
    arena: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingArena
    },
    trophies: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingScore
    },
    highestTrophies: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingScore
    },
    level: {
        type: Number,
        default: config.Player.StartDefault ? 1 : config.Player.StartingLevel
    },
    xpPoints: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingExperience
    },
    gold: {
        type: Number,
        default: config.Player.StartDefault ? 100 : config.Player.StartingResources.Gold
    },
    diamonds: {
        type: Number,
        default: config.Player.StartDefault ? 100 : config.Player.StartingResources.Gold
    },
    tutorialStage: {
        type: Number,
        default: 1
    },
    tutorialCompleted: {
        type: Number,
        default: 0
    },
    friendToken: {
        type: String,
        default: ''
    },
    accountPassword: {
        type: String,
        default: ''
    },
    switchAccountTarget: {
        type: Number,
        default: 0
    },
    switchAccountToken: {
        type: String,
        default: ''
    },
    crownChestCount: {
        type: Number,
        default: 0
    },
    battleID: {
        type: Number,
        default: 0
    },
    decks: {
        type: Object,
        default: [
            [26000000, 26000001, 26000002, 26000003, 26000004, 26000005, 26000006, 26000007],
            [26000000, 26000001, 26000002, 26000003, 26000004, 26000005, 26000006, 26000007],
            [26000000, 26000001, 26000002, 26000003, 26000004, 26000005, 26000006, 26000007],
            [26000000, 26000001, 26000002, 26000003, 26000004, 26000005, 26000006, 26000007],
            [26000000, 26000001, 26000002, 26000003, 26000004, 26000005, 26000006, 26000007]
        ]
    },
    selectedDeck: {
        type: Number,
        default: 0
    },
    cards: {
        type: Object,
        default: [
            { ID: 1, level: 0, xpPoints: 1 },
            { ID: 2, level: 0, xpPoints: 1 },
            { ID: 3, level: 0, xpPoints: 1 },
            { ID: 4, level: 0, xpPoints: 1 },
            { ID: 5, level: 0, xpPoints: 1 },
            { ID: 6, level: 0, xpPoints: 1 },
            { ID: 7, level: 0, xpPoints: 1 },
            { ID: 8, level: 0, xpPoints: 1 }
        ]
    },
    chests: {
        type: Array,
        default: [
            /*{
                chestID: 1,
                isUnlocked: false
            }*/
        ]
    },
    inClan: {
        type: Number,
        default: 0
    },
    clan: {
        ClanHighID: {
            type: Number,
            default: 0
        },
        ClanLowID: {
            type: Number,
            default: 1
        },
        ClanRole: {
            type: Number,
            default: 0
        }
    }
})

mongoose.model('players', playersSchema);
