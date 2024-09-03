const cache = require('./index');

const setCache = (duration, useDecoded = false) => (req, res, next) => {
    let key = req.originalUrl;    
    if(useDecoded && req.decoded ){
        if (req.decoded.wargaId >= 0) {                    
            key = `${key}@wargaId${req.decoded.wargaId}`;
        }else if (req.decoded.pengurusDesaAnggotaId >= 0) {
            key = `${key}@pengurusDesaAnggotaId${req.decoded.pengurusDesaAnggotaId}`;        
        }    
    }
    const cachedResponse = cache.get(key);    
    if (cachedResponse) {
        console.log("⚡ Using cache: ", key);
        return res.send(cachedResponse);
    } else {
        console.log("⚡ Setting cache: ", key);
        res.originalSend = res.send;
        res.send = (body) => {
            res.originalSend(body);
            cache.set(key, body, duration);
        }
        next();
    }
}

module.exports = setCache;
