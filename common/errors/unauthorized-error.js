/**
 * @author Guster
 * @email gusterwoei@gmail.com
 * @create date 2021-03-16 15:28:16
 * @modify date 2021-03-16 15:28:16
 * @desc Bad request exception
 */

const BaseError = require("./base-error")

class UnauthorizedError extends BaseError {

    constructor(msg) {
        super(401, msg)
    }
}
module.exports = UnauthorizedError