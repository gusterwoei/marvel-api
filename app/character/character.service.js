const isTest = process.env.NODE_ENV == 'test'
const marvelApi = isTest
    ? require('../apis/mock/marvel-api.mock')
    : require('../apis/marvel-api')
const util = require('../../common/utils/util')
// const BadRequestError = require('../../common/errors/bad-request-error')
// const InternalServerError = require('../../common/errors/internal-server-error')

const CLS_NAME = 'transfer.service.js'

class CharacterService {

    async getCharacters(limit, offset) {
        const METHOD_NAME = 'getCharacters'

        try {
            const resp = await marvelApi.getCharacters(limit, offset)
            return resp.data.results.map(it => it.id)
        } catch (e) {
            util.error(CLS_NAME, METHOD_NAME, 'get characters error', e)
            throw e
        }
    }
}

module.exports = new CharacterService();