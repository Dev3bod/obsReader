const sharp = require('sharp');
const path = require('path');

const crop = async (inputPath) => {
  // Input and output file paths
  const outputImagePath = `../screenshots/cropped-${path.basename(inputPath)}`;

  // Crop options (adjust these values based on the region you want to crop)
  const cropOptions = {
    left: 10,
    top: 2050,
    width: 300,
    height:150 ,
  };

  // Crop the image
   await sharp(inputPath)
    .extract(cropOptions)
    .toFile(outputImagePath)
    .then(() => {
      console.log(`Cropped image saved as ${outputImagePath}`);
    })
    .catch((error) => {70
      console.error('An error occurred while cropping the image:', error);
    });
};

module.exports = {crop};