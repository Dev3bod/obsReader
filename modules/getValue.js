const http = require('http');

// Function to fetch number from a URL
function fetchNumber(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';

      // Accumulate data chunks
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Process the response once complete
      res.on('end', () => {
        resolve(Number(data.trim())); // Convert the response to a number
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Example URL
let url = 'http://localhost:3000/imageprocess?path=../screenshots/cropped-2025-01-1222-01-11.png';

// Function to get the value
async function getValue(url) {
  try {
    let number = await fetchNumber(url); // Wait for the promise to resolve
    console.log('the number is ' + number); // Logs the fetched number
    return number; // Return the fetched number
  } catch (err) {
    console.error('Error fetching number:', err);
    throw err; // Rethrow the error to be handled by the caller
  }
}



// Exporting the function
module.exports = { fetchNumber, getValue };