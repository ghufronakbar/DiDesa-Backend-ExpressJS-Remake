const cache = require('./index');

const clearCache = (hasKey, useDecoded = false) => (req, res, next) => {
    const getAllKeys = cache.keys();

    const filteredKeys = getAllKeys.filter(key => {
        const hasKeyMatch = key.includes(hasKey);

        let useDecodedMatch = true; 
        if (useDecoded && req.decoded) {
            if (req.decoded.wargaId) {
                useDecodedMatch = key.includes(`wargaId${req.decoded.wargaId}`);
            } else if (req.decoded.pengurusDesaAnggotaId) {
                useDecodedMatch = key.includes(`pengurusDesaAnggotaId${req.decoded.pengurusDesaAnggotaId}`);
            }
        }              
        return hasKeyMatch && useDecodedMatch;
    });

    filteredKeys.forEach(key => {        
        console.log("⚡Deleting cache: ", key);
        cache.del(key);
    });

    next();
}

module.exports = clearCache;
