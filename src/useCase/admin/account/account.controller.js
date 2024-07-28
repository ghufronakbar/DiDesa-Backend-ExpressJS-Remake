
const { authLogin } = require('./account.service');

const login = async (req, res) => {
    const { nik, password } = req.body
    try {
        if (!nik || !password) {
            return res.status(400).json({
                status: 400,
                message: 'NIK dan password wajib diisi'
            })
        }
        const token = await authLogin(nik, password)
        if (token instanceof Error) {
            return res.status(401).json({ status: 401, message: token.message });
        }
        // SET COOKIES
        res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; Expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}`)        

        return res.status(200).json({ status: 200, message: 'Login berhasil', token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { login }