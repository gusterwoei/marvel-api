const BaseError = require('../../common/errors/base-error');
const characterService = require('./character.service');
const url = require('url');

/**
 * 
 * @param {Error} e 
 * @param {Response} res 
 */
function handleError(e, res) {
    res.status(e.status || 500).json((e instanceof BaseError) ? e : { error: e.message })
}

class CharacterController {

    /**
     * Get all characters
     * @param {Request} req 
     * @param {Response} res 
     */
    async getCharacters(req, res) {
        try {
            const query = url.parse(req.url, true).query;
            const result = await characterService.getCharacters(query.limit, query.offset);
            res.json(result)
        } catch (e) {
            handleError(e, res)
        }
    }

}

module.exports = new CharacterController();