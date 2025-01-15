const puppeteer = require('puppeteer');
const {formattedDate, formattedTime} = require('./dateAndTime.js');
const {crop} = require('./pngCropper.js');
const http = require('http'); // Use 'http' if the URL is not secure
const {fetchNumber, getValue} = require('./getValue.js');


(async () => {
  try {
    // URL of the login page
    const loginUrl = 'https://obs.ostimteknik.edu.tr/oibs/std/login.aspx';

    // Login credentials
    const username = '230208843'; // Replace with your username/student ID
    const password = '12345678'; // Replace with your password
    const key = '000';
    // Launch a new browser session in headless mode
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({
      width: 2048, // Set the width of the viewport
      height: 2048, // Set the height of the viewport
      deviceScaleFactor: 2, // Increases resolution (e.g., Retina display)
    });

    // Navigate to the login page
    await page.goto(loginUrl, { waitUntil: 'networkidle2' });
    console.log(`Navigated to ${loginUrl}`);
    
    
    
    let sId = `${formattedDate}${formattedTime}.png`;
    await page.screenshot({ path: `../screenshots/${sId}` });
    console.log(`Before submit screenshot taken and saved as screenshots/${sId}`);
    await crop(`../screenshots/${sId}`);
    console.log('just after crop');
    
    
    let AuthCode;
    try {
      AuthCode = await getValue(`http://localhost:3000/imageprocess?path=../screenshots/cropped-${sId}`);
      console.log(`The Auth key is ${AuthCode}`);
    } catch (err) {
      console.error('Error fetching AuthCode:', err);
      throw err; // Rethrow the error to be handled by the outer catch block
    }


    // Find the username field by type (text input)
    await page.type('#txtParamT01', username);
    console.log('Username entered');

    // Find the password field by type (password input)
    await page.type('#txtParamT02', password);
    console.log('Password entered');
    
    
  

    // let AuthCode = '33';
    //auth code
    console.log('the key just before the wrtting ' + AuthCode);
    await page.type('#txtSecCode', `${AuthCode}`);
    console.log('Auth code entered');
    

    await page.screenshot({ path: `../screenshots/a${sId}` });
    console.log(`Before submit screenshot taken and saved as screenshots/${sId}`);
    
    
    
    // Find the login button by type (submit input) and click it
    await page.click('#btnLogin');
    console.log('Login button clicked');


    
    
    // Wait for navigation to complete (e.g., wait for the dashboard page to load)
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    
    // Take a screenshot of the logged-in page
    await page.screenshot({ path: `../screenshots/a${sId}` });
    console.log(`After submit screenshot taken and saved as screenshots/${sId}`);
    

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();


