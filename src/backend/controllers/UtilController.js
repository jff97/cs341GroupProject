const UtilService = require('../services/UtilService');

async function getPlatform(req, res, next) {
    try {
        const platform = await UtilService.getPlatform();
        res.status(200).send(platform);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getPlatform
};