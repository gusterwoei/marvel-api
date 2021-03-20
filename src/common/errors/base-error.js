/**
 * @author Guster
 * @email gusterwoei@gmail.com
 * @create date 2021-03-16 15:29:47
 * @modify date 2021-03-16 15:29:47
 * @desc [description]
 */

class BaseError extends Error {
    constructor(status, msg) {
        super(msg)
        this.status = status
        this.error = msg
    }
}
module.exports = BaseError