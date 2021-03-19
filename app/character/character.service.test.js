const transferService = require('./transfer.service')

jest.mock('axios')

describe('Transfer Credit service', () => {

    it('validation should throw error', () => {
        let params = {}
        expect(() => {
            transferService.validateTransferCredit(params)
        }).toThrow()
    })

    it('validation should not throw error', () => {
        expect(() => {
            transferService.validateTransferCredit({
                amount: 100,
                fromBic: 'lorem',
                toBic: 'ipsum',
                fromAccountNo: '00000',
                fromAccountName: 'lorem',
                toAccountNo: '99999',
                toAccountName: 'ipsum',
                transactionId: '17000000000000'
            })
        }).not.toThrow()
    })

    it('transfer credit should be successful', async () => {
        const req = {
            body: {
                amount: 100,
                fromBic: 'lorem',
                toBic: 'ipsum',
                fromAccountNo: '00000',
                fromAccountName: 'lorem',
                toAccountNo: '99999',
                toAccountName: 'ipsum',
                transactionId: '17000000000000'
            }
        }
        await expect(await transferService.creditTransfer(req)).toBe(undefined)
        
        // error input test
        delete req.body.amount
        await expect(transferService.creditTransfer(req)).rejects.toThrow()
    })

    it('transfer credit status receive should be successful', async () => {
        const req = {
            body: {
                RPTxnID: '17000000000000',
                TxnID: 'A00000001',
                BICFrom: 'lorem',
                BICTo: 'ipsum',
                TxnStatus: 'OK',
                ReasonCode: '00',
                TxnDate: '2020-01-01',
            }
        }
        await expect(await transferService.sendStatusReceived(req)).toBe(undefined)
    })

    it('Non-RP to RP transfer receive should be successful', async () => {
        const req = {
            body: {
                TxnID: 'A00000001',
                BICFrom: 'lorem',
                BICTo: 'ipsum',
                TxnDate: '2020-01-01',
                AccNumFrom: '1000000000',
                AccNameFrom: 'LOREM',
                AccNumTo: '1000000001',
                AccNameTo: 'IPSUM',
                TxnAmount: '100.00',
                PurposeCode: '00',
            }
        }
        await expect(await transferService.receiveTransfer(req)).toBe(undefined)
    })
});