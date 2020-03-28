const crypto = require('crypto');

function cryptoS(str) {
    return  crypto.createHash('sha256').update(''+str).digest('hex');
}

module.exports={
    cryptoS
};
