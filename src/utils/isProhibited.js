/**
 * Check if text contains prohibited words
 * @param {string} text
 * @param {string[]} prohibitedWords
 * @returns {boolean}
 */

const isProhibited = async (text, prohibitedWords) => {    
    const lowerCaseText = text.toLowerCase();        
    const cleanedText = lowerCaseText.replace(/[^a-z]/g, '');        
    for (const word of prohibitedWords) {        
        if (cleanedText.includes(word.toLowerCase())) {
            console.log(12)
            return true;
        }
    }
    return false;
};

module.exports = isProhibited