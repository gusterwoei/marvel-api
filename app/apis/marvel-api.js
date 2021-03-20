/**
 * @author Guster
 * @email gusterwoei@gmail.com
 * @create date 2021-03-20 14:27:08
 * @modify date 2021-03-20 14:27:57
 * @desc Marvel API http client
 */

const axios = require('axios');
const util = require('../../common/utils/util')
const crypto = require('crypto');
const cache = require('../../common/utils/cache');
const { cacheKeys } = require('../../common/constants');

const CLS_NAME = 'marvel-api.js'
const config = {
    baseUrl: process.env.BASE_URL,
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
}

class MarvelApi {

    getAxios() {
        const ts = new Date().getTime()
        const hash = crypto.createHash('md5')
            .update(`${ts}${config.privateKey}${config.publicKey}`)
            .digest('hex')
        return axios.create({
            params: {
                apikey: config.publicKey,
                ts,
                hash,
            }
        });
    }

    /**
     * get all characters
     * @param {number} limit max 100
     * @param {number} offset zero-based index
     * @returns 
     */
    async getCharacters(limit = 100, offset = 0) {
        const METHOD_NAME = 'getCharacters'

        // retrieve from cache if exists
        const cacheKey = cacheKeys.characters(limit, offset)
        const hit = cache.has(cacheKey)
        if (hit) {
            util.log(CLS_NAME, METHOD_NAME, `Cache hit with key (${cacheKey})`)
            return cache.get(cacheKey)
        }

        const url = `${config.baseUrl}/characters`
        const resp = await this.getAxios().get(url, {
            params: {
                limit,
                offset
            }
        })

        // save in cache (expired after 1 day)
        util.log(CLS_NAME, METHOD_NAME, `Save new cache with key ${cacheKey}`)
        cache.set(cacheKey, resp.data, 24 * 60 * 60)

        return resp.data
    }

    /**
     * Get character's detail
     * @param {number} id character's id
     * @returns 
     */
    async getCharacterDetail(id) {
        const METHOD_NAME = 'getCharacterDetail'
        
        // retrieve from cache if exists
        const cacheKey = cacheKeys.characterDetail(id)
        if (cache.has(cacheKey)) {
            util.log(CLS_NAME, METHOD_NAME, `Cache hit with key (${cacheKey})`)
            return cache.get(cacheKey)
        }

        const url = `${config.baseUrl}/characters/${id}`
        const resp = await this.getAxios().get(url)

        // save in cache (expired after 1 day)
        util.log(CLS_NAME, METHOD_NAME, `Save new cache with key ${cacheKey}`)
        cache.set(cacheKey, resp.data, 24 * 60 * 60)

        return resp.data
    }

}
module.exports = new MarvelApi();