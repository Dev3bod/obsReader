require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const OpenAI = require('openai');
const { imageToBase64 } = require('./imageToBase64'); // Adjust the path to where the function is saved

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Express app
const app = express();
const port = 3000;

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint to upload and process image
app.get('/imageprocess', async (req, res) => {
  try {
    const file = req.query.path;
    if (!file) return res.status(400).send('No file path provided');
    console.log(`Processing file from query: ${file}`);

    let path = imageToBase64(file);

    let content = await main(path);
    res.send(content);
    console.log(content);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing image');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const main = async (path) => {

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "solve the equation, make sure to read the numbers and double check them, the numbers should be in the same size, if a number is in a deffrent size it's not a number, return the addition answer only, no extra text." },
            {
              type: "image_url",
              image_url: {
                "url": `${path}`,
              },
            }
          ],
        },
      ],
    });
        return response.choices[0].message.content;
  }

