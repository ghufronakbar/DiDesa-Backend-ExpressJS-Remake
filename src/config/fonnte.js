const { FONNTE_API_KEY } = require("../constant/fonnte");

const fonnte = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': FONNTE_API_KEY,
    },
    countryCode: '62'
}

module.exports = fonnte