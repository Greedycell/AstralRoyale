const cards = require('./cards.json');
let scid = {}
Object.values(cards).forEach(v => scid[v.scid] = v)

module.exports.id = cards
module.exports.scid = scid
module.exports.common = Object.values(cards).filter(card => card.rarity === 'Common')
module.exports.rare = Object.values(cards).filter(card => card.rarity === 'Rare')
module.exports.epic = Object.values(cards).filter(card => card.rarity === 'Epic')
module.exports.legendary = Object.values(cards).filter(card => card.rarity === 'Legendary')