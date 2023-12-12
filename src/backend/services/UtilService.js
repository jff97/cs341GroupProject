const os = require('os');

class UtilService {
    async getPlatform() {
        return os.version() + " " + os.release() + " (" + os.arch() + ")";
    }
}

const utilServiceInstance = Object.freeze(new UtilService());
module.exports = utilServiceInstance;