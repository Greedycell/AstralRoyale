const mongoose = require('mongoose');
const config = require('../config.json');

module.exports = class DataBase {
    constructor() { }
    connect(isSuccess) {
        mongoose.connect(`mongodb://${config.Database.Password ? `${config.Database.Password}:` : ''}${config.Database.Host}/${config.Database.Name}`)
            .then(() => {
                require('./models/players');
                this.mongoosePlayers = mongoose.model('players');
                require('./models/clans');
                this.mongooseClans = mongoose.model('clans');
                isSuccess(true);
            })
            .catch(function (error) {
                console.log(error);
                isSuccess(false);
            });
    }
    disconnect() {
        mongoose.disconnect()
            .then(result => {
                console.log(`Successfully disconnected from the database`, result);
            })
            .catch(error => {
                console.log(`An error occoured disconnecting from the database`, error);
            });
    }
    getPlayer(device, callback) {
        this.mongoosePlayers.findOne({
            highID: device.userObject.highID,
            lowID: device.userObject.lowID,
            token: device.userObject.token
        })
            .then(player => {
                if (player) {
                    callback(false, player);
                } else {
                   // if (device.userObject.token === '') {
                        this.mongoosePlayers.findOne({})
                            .sort({
                                lowID: 'desc'
                            })
                            .then(lastPlayer => {
                                generateToken(14, newToken => {
                                    this.mongoosePlayers.create({
                                        highID: 0,
                                        lowID: lastPlayer ? (lastPlayer.lowID + 1) : 1,
                                        token: newToken
                                    })
                                        .then(createdPlayer => {
                                            callback(false, createdPlayer);
                                        });
                                });
                            });
                   // }
                   /* else {
                        let LoginFailed = new global.LogicScrollMessageFactory.serverMessages.LoginFailed(this.device, 3, 'Clean app data and try again');
                        LoginFailed.encode();
                        LoginFailed.send(false);
                    }*/

                }
            })
            .catch(error => {
                console.log(`An error occoured fetching a player from the database`, error);
            });
    }

    getClan(userObject, callback) {
        if (userObject.clan) {
            this.mongoosePlayers.findOne({
                highID: userObject.clan.highID,
                lowID: userObject.clan.lowID
            })
                .then(clan => {
                    if (clan) {
                        console.log("Clan found");
                        callback(clan);
                    } else {
                        console.log("Clan not found");
                    }
                })
                .catch(error => {
                    console.log(`An error occoured fetching a clan from the database`, error);
                });
        } else {
            console.log(`Player doesn't have a clan`);
        }
    }

    async getAllPlayers(excludeLowID) {
        const players = await this.mongoosePlayers.find({
            lowID: { $ne: excludeLowID }
        })

        if (!players.length) {
            throw new Error("No players are found.")
        }

        return players
    }
}

function generateToken(n, callback) {
    require('crypto').randomBytes(n, function (err, buffer) {
        callback(buffer.toString('hex'));
    });
}