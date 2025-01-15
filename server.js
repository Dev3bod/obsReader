const express = require('express');
const bodyParser = require('body-parser');
const { loginAndCapturePages } = require('./modules/login');
const loginInfo = require('./config/loginInfo.json');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Login and save page responses
app.get('/login', async (req, res) => {
  try {
    console.log('Starting login process...');
    const pages = await loginAndCapturePages(loginInfo);
    res.send({
      message: 'Login process completed successfully.',
      pages,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred during the login process.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
