const os = require('os');

class UtilService {
    async getPlatform() {
        return os.type() + " " + os.release();
    }
}

const utilServiceInstance = Object.freeze(new UtilService());
module.exports = utilServiceInstance;