const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constant')

const userCheck = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        if(!bearerToken){
            req.decoded.isLoggedIn = false
            return next()
        }else{
            const token = bearerToken.replace(/^Bearer\s+/, "");
            jwt.verify(token, JWT_SECRET, async (err, decoded) => {
                if (err) {
                    req.decoded.isLoggedIn = false
                    return next()
                }
                if (!decoded) {
                    req.decoded.isLoggedIn = false
                    return next()
                }
                if (decoded.exp < Math.floor(Date.now() / 1000)) {
                    req.decoded.isLoggedIn = false
                    return next()
                }
                req.decoded = decoded
                req.decoded.isLoggedIn = true
                next()
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })        
    }
}

module.exports = { userCheck }