const now = new Date();

// Get the current date
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(now.getDate()).padStart(2, '0');

// Get the current time
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

// Format date and time with hyphens
const formattedDate = `${year}-${month}-${day}`;
const formattedTime = `${hours}-${minutes}-${seconds}`; // Replaced ":" with "-"

console.log(`Current Date: ${formattedDate}`);
console.log(`Current Time: ${formattedTime}`);

module.exports = { formattedDate, formattedTime };