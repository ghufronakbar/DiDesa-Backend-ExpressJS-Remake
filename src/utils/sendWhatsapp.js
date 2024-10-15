const fonnte = require('../config/fonnte')
const axios = require('axios');

const sendWhatsapp = async (phone, message) => {
    try {
        await axios.post('https://api.fonnte.com/send', {
            target: phone,
            message: message,
            countryCode: fonnte.countryCode
        }, {
            headers: {
                ...fonnte.headers
            }
        });
    } catch (error) {
        console.error('Error sending WhatsApp message:', error.response ? error.response.data : error.message);
    }
};


module.exports = sendWhatsapp 