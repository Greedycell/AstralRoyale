const mongoose = require('mongoose');
const config = require('../config.json');
const ConnectedClients = require('../Core/ConnectedClients')

module.exports = class Database {
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
                    this.mongoosePlayers.findOne({})
                        .sort({ lowID: 'desc' })
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
                }
            })
            .catch(error => {
                console.log(`An error occoured fetching a player from the database`, error);
            });
    }

    async getClanByID(highID, lowID) { return this.mongooseClans.findOne({ highID, lowID }); }

    async getPlayerClan(player) {
        if (!player || !player.clan || !player.inClan) return null;
        return this.getClanByID(player.clan.ClanHighID, player.clan.ClanLowID);
    }

    async getPlayerByID(highID, lowID) {
        if (highID === undefined || lowID === undefined) return null;
        return this.mongoosePlayers.findOne({ highID, lowID }).lean();
    }
    async getClientByID (highID, lowID) {
        if (highID === undefined || lowID === undefined) return null
        for (const client of ConnectedClients) {
            if (!client?.player) continue
            if (
                Number(client.player.highID) === Number(highID) &&
                Number(client.player.lowID) === Number(lowID)
            ) {
                return client
            }
        }
        return null
    }

    /*async searchClans(nameQuery = '', limit = 20, filters = {}) {
        const trimmedQuery = String(nameQuery || '').trim()
        const query = {};
        if (trimmedQuery) query.name = { $regex: trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
        if (filters.locationInstanceID !== undefined && filters.locationInstanceID !== null) query.location = filters.locationInstanceID;
        if (filters.minimumRequiredTrophies !== undefined && filters.minimumRequiredTrophies !== null) query.requiredTrophies = { $gte: filters.minimumRequiredTrophies };
        if (filters.canJoin) query.type = { $ne: 2 }; // exclude closed clans
        let clans = await this.mongooseClans.find(query).sort({ trophies: -1 }).lean();
        if (filters.minimumMembers !== undefined && filters.minimumMembers !== null) clans = clans.filter(c => c.members.length >= filters.minimumMembers);
        if (filters.maximumMembers !== undefined && filters.maximumMembers !== null) clans = clans.filter(c => c.members.length <= filters.maximumMembers);
        return clans.slice(0, limit);
    }*/
    async searchClans(nameQuery = '', limit = 20) {
        const trimmedQuery = String(nameQuery || '').trim()
        const filter = trimmedQuery
            ? { name: { $regex: trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } }
            : {};
        return this.mongooseClans.find(filter).limit(limit).sort({ trophies: -1 });
    }

    async getJoinableClans(limit = 20) { return this.mongooseClans.find({ type: 0 }).limit(limit).sort({ trophies: -1 }).lean(); }
    async getTopClans(limit = 200) { return this.mongooseClans.find({}).limit(limit).sort({ trophies: -1 }); }

    async createClan(player, { name, description, badge, type, requiredTrophies, location }) {
        // Get the next lowID
        const lastClan = await this.mongooseClans.findOne({}).sort({ lowID: 'desc' });
        const newLowID = lastClan ? lastClan.lowID + 1 : 1;

        const memberEntry = buildMemberEntry(player, 2 /* Leader */);

        const clan = await this.mongooseClans.create({
            highID: 0,
            lowID: newLowID,
            name,
            description: description || '',
            badge: badge || 1,
            type: type || 0,
            requiredTrophies: requiredTrophies || 0,
            location: location || 57,
            trophies: player.trophies,
            members: [memberEntry]
        });

        player.inClan = 1;
        player.clan.ClanHighID = clan.highID;
        player.clan.ClanLowID = clan.lowID;
        player.clan.ClanRole = 2; // Leader

        player.markModified('clan');
        await player.save();

        return clan;
    }

    async joinClan(player, clan) {
        if (clan.members.length >= 50) throw new Error('Clan is full.');
        if (clan.type === 2 /* Closed */) throw new Error('Clan is closed.');
        if (player.trophies < clan.requiredTrophies) throw new Error(`Need ${clan.requiredTrophies} trophies to join.`);

        const memberEntry = buildMemberEntry(player, 1 /* Member */);
        clan.members.push(memberEntry);

        clan.trophies = clan.members.reduce((sum, m) => sum + (m.trophies || 0), 0);
        clan.markModified('members');
        await clan.save();

        player.inClan = 1;
        player.clan.ClanHighID = clan.highID;
        player.clan.ClanLowID = clan.lowID;
        player.clan.ClanRole = 1; // Member

        player.markModified('clan');
        await player.save();

        return clan;
    }

    async leaveClan(player) {
        const clan = await this.getClanByID(
            player.clan.ClanHighID,
            player.clan.ClanLowID
        );
        if (!clan) return;

        const wasLeader = player.clan.ClanRole === 2;

        clan.members = clan.members.filter(m => !(m.highID === player.highID && m.lowID === player.lowID));

        if (clan.members.length === 0) {
            await this.mongooseClans.deleteOne({ highID: clan.highID, lowID: clan.lowID });
        } else {
            if (wasLeader) {
                clan.members[0].role = 2;
                await this.mongoosePlayers.updateOne(
                    { highID: clan.members[0].highID, lowID: clan.members[0].lowID },
                    { $set: { 'clan.ClanRole': 2 } }
                );
            }
            clan.trophies = clan.members.reduce((sum, m) => sum + (m.trophies || 0), 0);
            clan.markModified('members');
            await clan.save();
        }

        player.inClan = 0;
        player.clan.ClanHighID = 0;
        player.clan.ClanLowID = 1;
        player.clan.ClanRole = 0;

        player.markModified('clan');
        await player.save();
    }

    async updateClanSettings(clan, { description, badge, type, requiredTrophies, location }) {
        if (description !== undefined) clan.description = description;
        if (badge !== undefined) clan.badge = badge;
        if (type !== undefined) clan.type = type;
        if (requiredTrophies !== undefined) clan.requiredTrophies = requiredTrophies;
        if (location !== undefined) clan.location = location;
        await clan.save();
        return clan;
    }

    async getAllPlayers(excludeLowID) {
        const filter = excludeLowID ? { lowID: { $ne: excludeLowID } } : {};
        const players = await this.mongoosePlayers.find(filter).sort({ trophies: -1 }).lean();
        if (!players.length) throw new Error('No players are found.');
        return players;
    }
    async getTopPlayers(limit = 200) { return this.mongoosePlayers.find({}).limit(limit).sort({ trophies: -1 }); }
    async getLocalPlayers(limit = 200) { return this.mongoosePlayers.find({}).limit(limit).sort({ trophies: -1 }); }
}

function buildMemberEntry(player, role) {
    return {
        highID: player.highID,
        lowID: player.lowID,
        name: player.name,
        role, // 1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader
        trophies: player.trophies || 0,
        level: player.level || 1,
        arena: player.arena || 0,
        donated: 0,
        donationsReceived: 0
    };
}

function generateToken(n, callback) {
    require('crypto').randomBytes(n, function (err, buffer) {
        callback(buffer.toString('hex'));
    });
}