const isTest = process.env.NODE_ENV == 'test'
const marvelApi = isTest
    ? require('../apis/mock/marvel-api.mock')
    : require('../apis/marvel-api')
const { InternalServerError } = require('http-errors')
const BadRequestError = require('../../common/errors/bad-request-error')
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

    async getCharacterDetail(id) {
        const METHOD_NAME = 'getCharacterDetail'
        try {
            const resp = await marvelApi.getCharacterDetail(id)
            const char = resp.data.results.length > 0 ? resp.data.results[0] : null
            
            if (char == null) throw new BadRequestError(`Character with id (${id}) not found`)
            
            return {
                id: char.id,
                name: char.name,
                description: char.description
            }
        } catch (e) {
            const error = e.response ? e.response.data.status : e.message
            util.error(CLS_NAME, METHOD_NAME, `get character detail error. id: ${id}`, error)
            throw new InternalServerError(error)
        }
    }
}

module.exports = new CharacterService();