const fs = require('fs');

/**
 * Convert an image file to a Base64-encoded string.
 * @param {string} imagePath - The path to the image file.
 * @returns {string} - The Base64-encoded string of the image.
 */
const imageToBase64 = (imagePath) => {
  try {
    // Read the image file as a buffer
    const imageBuffer = fs.readFileSync(imagePath);
    // Convert the buffer to a Base64 string
    const base64String = `data:image/${getImageExtension(imagePath)};base64,${imageBuffer.toString('base64')}`;
    return base64String;
  } catch (error) {
    throw new Error(`Error converting image to Base64: ${error.message}`);
  }
};

/**
 * Get the file extension of the image and return it for the Base64 prefix.
 * @param {string} filePath - The path to the image file.
 * @returns {string} - The image file extension (e.g., png, jpg).
 */
const getImageExtension = (filePath) => {
  const extension = filePath.split('.').pop().toLowerCase();
  return extension === 'jpg' ? 'jpeg' : extension; // Handle jpg as jpeg for Base64
};

module.exports = { imageToBase64 };
