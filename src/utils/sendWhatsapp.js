const fonnte = require('../config/fonnte')
const axios = require('axios');

const sendWhatsapp = async (phone, message) => {
    console.log("Sending WhatsApp message to: ", phone);
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
        console.log("Message sent successfully");
    } catch (error) {
        console.log('Error sending WhatsApp message:', error.response ? error.response.data : error.message);
    }
};


module.exports = sendWhatsapp 