const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constant')

const userCheck = async (req, res, next) => {
    let isLoggedIn = false
    req.decoded = { isLoggedIn }
    try {
        const bearerToken = req.headers.authorization
        if (!bearerToken) {                        
            return next()
        } else {
            const token = bearerToken.replace(/^Bearer\s+/, "");
            jwt.verify(token, JWT_SECRET, async (err, decoded) => {
                if (err) {                                        
                    return next()
                }
                if (!decoded) {                    
                    return next()
                }
                if (decoded.exp < Math.floor(Date.now() / 1000)) {                                        
                    return next()
                }
                isLoggedIn = true   
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