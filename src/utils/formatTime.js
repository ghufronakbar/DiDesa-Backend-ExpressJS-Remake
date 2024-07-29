const formatTime = (dateString) => {
  const date = new Date(dateString);

  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();    
  let hourPlus7 = hour + 7;

  if (hourPlus7 >= 24) {
      hourPlus7 -= 24;
  }

  const formattedHour = String(hourPlus7).padStart(2, '0');
  const formattedMinute = String(minute).padStart(2, '0');

  return `${formattedHour}:${formattedMinute}`;
};

  module.exports = formatTime
  