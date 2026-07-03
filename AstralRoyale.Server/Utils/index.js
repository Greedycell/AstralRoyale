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
    },
    getSecondsUntilNextMonth () {
        const now = new Date()
        const nextMonthStart = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth() + 1,
            1, 0, 0, 0, 0
        ))
        const diffMs = nextMonthStart.getTime() - now.getTime()
        return Math.floor(diffMs / 1000)
    }
}