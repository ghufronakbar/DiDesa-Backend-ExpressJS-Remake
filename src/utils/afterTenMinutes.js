const afterTenMinutes = () => {
    const date = new Date();
    date.setHours(date.getHours() + 7); 
    date.setMinutes(date.getMinutes() + 10);
    return date.toISOString(); 
}

module.exports = afterTenMinutes