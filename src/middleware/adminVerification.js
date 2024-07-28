const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constant')

const verificationAdmin = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        if (!bearerToken) {
            return res.status(401).json({ status: 401, message: 'Unauthorized' })
        }
        const token = bearerToken.replace(/^Bearer\s+/, "");
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: 401, message: 'Unauthorized' })
            }
            if (!decoded) {
                return res.status(401).json({ status: 401, message: 'Unauthorized' })
            }
            if (decoded.exp < Math.floor(Date.now() / 1000)) {
                return res.status(401).json({ status: 401, message: 'Unauthorized' })
            }
            if (decoded.pengurusDesaAnggotaId) {
                req.decoded = decoded
                next()
            } else {
                return res.status(401).json({ status: 401, message: 'Unauthorized' })
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }

}

module.exports = { verificationAdmin }