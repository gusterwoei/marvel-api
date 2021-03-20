/**
 * @author Guster
 * @email gusterwoei@gmail.com
 * @create date 2021-03-20 15:31:14
 * @modify date 2021-03-20 15:31:14
 * @desc character service class
 */

const isTest = process.env.NODE_ENV == 'test'
const marvelApi = isTest
    ? require('../apis/mock/marvel-api.mock')
    : require('../apis/marvel-api')
const BadRequestError = require('../../common/errors/bad-request-error')
const util = require('../../common/utils/util')

const CLS_NAME = 'transfer.service.js'

class CharacterService {

    /**
     * Get characters
     * @param {number} limit 
     * @param {number} offset 
     * @returns 
     */
    async getCharacters(limit, offset) {
        const METHOD_NAME = 'getCharacters'

        // input validation
        if (limit < 1) throw new BadRequestError('limit cannot be less than 1')
        if (offset < 0) throw new BadRequestError('offset cannot be less than 0')

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
            throw new BadRequestError(error)
        }
    }
}

module.exports = new CharacterService();