const crypto = require('crypto');
const uuid = require('uuid');
const fnv = require('fnv-plus');
const { defaultLogger } = require('./logging')

// 生成随机盐
exports.generateRandomSalt = () => {
    return Math.random().toString().slice(2, 5);
};


exports.generateSilotTransId = (pre) => {
    let orderId = pre + Date.now().toString().substr(1) + process.hrtime()[1].toString().substring(3, 7) + fnv.hash(uuid.v1(), 64).dec().substring(9, 19);
    return orderId;
};

exports.generate26SilotTransId = (pre) => {
    let orderId = pre + Date.now().toString().substr(1) + process.hrtime()[1].toString().substring(3, 7) + fnv.hash(uuid.v1(), 64).dec().substring(11, 19);
    return orderId;
};

/**
 * 生成HmacSha1 签名
 * @param content   string  加密内容
 * @param secretKey string  秘钥
 * @returns {PromiseLike<ArrayBuffer>}
 */
exports.genHmacSha1Sign = (content, secretKey) => {
    return crypto.createHmac("sha1", secretKey).update(content).digest('hex').toLowerCase();
};


exports.checkSign = (body, signature, shared_key) => {
    let result = {
        code: 10000,
        msg: 'success',
        result: ''
    };
    let payload = body;
    if (signature == undefined || signature == null || signature == '') {
        result.code = 10009;
        result.msg = 'signature is missing';
        return result;
    }
    let params = JSON.stringify(payload);
    let verifySignature = crypto.createHmac("sha256", shared_key).update(params).digest('hex');
    if (verifySignature != signature) {
        result.code = 10009;
        result.msg = 'signature verification failed';
        return result;
    }
    return result;
};

exports.checkMerchantSign = (body, signature, shared_key) => {
    if (signature === '') {
        return false;
    }
    let verifySignature = genHmacSha256(shared_key, body);
    console.log("signature：" + signature);
    console.log("verifySignature：" + verifySignature);
    return verifySignature === signature;

};

exports.genHmacSha256 = (shared_key, params) => {
    let jsonStr = JSON.stringify(params);
    console.log("json: " + jsonStr);
    //create hmac with output of base64 format
    return crypto.createHmac("sha256", shared_key).update(jsonStr).digest('hex');
};

exports.getSecretKey = (privateKey, publicKey) => {
    try {
        // console.log(crypto.getCurves()) //查看 ECDH 模式
        const public_key = publicKey.slice(46, publicKey.length);
        const private_key = privateKey.slice(64, privateKey.length);
        const merchant = crypto.createECDH('secp256k1');
        merchant.setPrivateKey(private_key, 'hex');

        const secretKey = merchant.computeSecret(public_key, 'hex', 'hex');
        console.log(secretKey)

        return secretKey;


    } catch (e) {
        console.error(e)
    }
};

exports.log = (cls, method, message) => {
    let log = `[${cls} -> ${method}] :: ${message}`
    console.log(log)
    defaultLogger.info(log)
    return log
}

exports.error = (cls, method, message, error) => {
    let log = `[${cls} -> ${method}] :: ${message}`
    console.error(log, error)
    defaultLogger.error(log)
    return log
}

/**
 * 
 * @param {number} amount in cent
 * @returns 
 */
exports.formatAmount = (amount) => {
    return (+amount / 100).toFixed(2)
}

exports.amountToCent = (amount) => {
    return +amount * 100
}

exports.stringifyJSON = (json) => {
    try {
        return JSON.stringify(json)
    } catch (e) {
        return json
    }
}
