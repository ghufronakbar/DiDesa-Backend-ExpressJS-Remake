const { FONNTE_API_KEY } = require('../constant/fonnte')
const axios = require('axios');

const sendWhatsapp = async (phone, message) => {
    try {
        const response = await axios.post('https://api.fonnte.com/send', {
            target: phone,
            message: message,
            countryCode: '62'
        }, {
            headers: {
                'Authorization': FONNTE_API_KEY,
                'Content-Type': 'application/json'
            }
        });        
    } catch (error) {
        console.error('Error sending WhatsApp message:', error.response ? error.response.data : error.message);
    }
};


module.exports = sendWhatsapp 