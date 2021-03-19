const util = require('./util')

describe('util.js test', () => {
    it('amount should be formatted accordingly', () => {
        let amount = 12300
        expect(util.formatAmount(amount)).toEqual('123.00')
        
        amount = 33650
        expect(util.formatAmount(amount)).toEqual('336.50')

        amount = "30.60"
        expect(util.amountToCent(amount)).toEqual(3060)
    })

    it('JSON should be stringified accordingly', () => {
        let json = {name: 'lorem'}
        expect(util.stringifyJSON(json)).not.toBeNull()
        expect(util.stringifyJSON(json)).toEqual("{\"name\":\"lorem\"}")
    })
})