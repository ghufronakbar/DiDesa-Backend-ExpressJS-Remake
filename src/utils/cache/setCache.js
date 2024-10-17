const cache = require('./index');

const setCache = (duration, useDecoded = false) => (req, res, next) => {
    let key = req.originalUrl;
    if (useDecoded && req.decoded) {
        if (req.decoded.wargaId >= 0) {
            key = `${key}@wargaId${req.decoded.wargaId}`;
        } else if (req.decoded.pengurusDesaAnggotaId >= 0) {
            key = `${key}@pengurusDesaAnggotaId${req.decoded.pengurusDesaAnggotaId}`;
        }
    }
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
        console.log("⚡ Using cache: ", key);
        const jsonCache = JSON.parse(cachedResponse)
        return res.send(jsonCache);
    } else {
        console.log("⚡ Setting cache: ", key);
        res.originalSend = res.send;
        res.send = (body) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                console.log("⚡ Caching response for: ", key);
                const responseBody = typeof body === 'object' ? JSON.stringify(body) : body;
                cache.set(key, responseBody, duration);
            } else {
                console.log("😵 Not caching response due to error status: ", res.statusCode);
            }
            res.originalSend(body);
        }
        next();
    }
}

module.exports = setCache;
