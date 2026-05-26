const utils = require('./');
const cards = require('./json/cards');
const cardsJson = require('./json/cards.json');

module.exports = {
    addCardPointsByInstanceID(device, id, xpPoints) {
        /*let cardObject = utils.findObjectByKey(device.player.cards, 'ID', id);

        let updatedCard = device.player.cards[device.player.cards.indexOf(cardObject)];
        updatedCard.xpPoints += xpPoints;
        device.player.cards[device.player.cards.indexOf(cardObject)] = updatedCard;
        device.player.markModified('cards');
        device.player.save();*/
    },
    async addCardPointsBySCID(device, id, xpPoints) {
        try {
            id = this.SCIDtoInstanceID(id);
            let cardObject = utils.findObjectByKey(device.player.cards, 'ID', id);

            if (cardObject) {
                cardObject.xpPoints += xpPoints;
            } else {
                cardObject = { ID: id, level: 0, xpPoints: xpPoints };
                device.player.cards.push(cardObject);
            }

            device.player.markModified('cards');
            
            await device.player.save();
        }
        catch (e) {}
    },
    instanceIDtoSCID(id) {
        if (id < 63) {
            return 26 * 1000000 + (id - 1);
        }
        else if (id > 62 && id < 77) {
            return 27 * 1000000 + (id - 63);
        }
        else if (id > 76 && id < 100) {
            return 28 * 1000000 + (id - 78);
        }
        return null;
    },
    SCIDtoInstanceID(id) {
        if (parseInt(id / 1000000) === 26) {
            return id - 26000000 + 1;
        }
        else if (parseInt(id / 1000000) === 27) {
            return id - 27000000 + 63;
        }
        else if (parseInt(id / 1000000) === 28) {
            return id - 28000000 + 78;
        }
        return null;
    },
    getCards(count) {
        let randomCards = [];
        for(let index = 0; index < count;)
        {
            let randomCard = cards.id[this.randomInt(0, cards.id.length)];
            if(!randomCards.includes(randomCard))
            {
                randomCards.push(randomCard);
                index++;
            }
        }
        return randomCards;
    },
    randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
}