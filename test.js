const date = new Date("2024-12-31").toISOString().slice(0,10);
const now = new Date().toISOString().slice(0,10);

console.log(date, "<", now, date < now);
