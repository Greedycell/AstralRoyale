module.exports = {
    findObjectByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    },
    randomInt (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
}