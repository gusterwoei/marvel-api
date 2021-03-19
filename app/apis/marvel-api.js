const axios = require('axios');
const util = require('../../common/utils/util')
const crypto = require('crypto')

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

    async getCharacters(limit = 100, offset = 0) {
        const url = `${config.baseUrl}/characters`
        const resp = await this.getAxios().get(url, {
            params: {
                limit,
                offset
            }
        })
        return resp.data
    }

}
module.exports = new MarvelApi();