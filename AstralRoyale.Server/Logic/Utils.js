module.exports = {
    range: function(val1, val2){
        let arr = []

        for(let i = val1; i < val2; i++){
            arr.push(i)
        }
        
        return arr
    }
}