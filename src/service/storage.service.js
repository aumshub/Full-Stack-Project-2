require('dotenv').config();
const ImageKit = require('imagekit');
const fs = require('fs');

// Initialize ImageKit client
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

/**
 * Upload a file to ImageKit
 * @param {Buffer|string} fileData - File buffer (from multer) or file path
 * @param {string} fileName - Name for the uploaded file
 * @returns {Promise} Upload response from ImageKit
 */
async function uploadFile(fileData, fileName) {
  try {
    let fileToUpload;
    
    // Check if fileData is a Buffer (from multer) or a file path
    if (Buffer.isBuffer(fileData)) {
      // If it's a Buffer, convert to base64 string
      fileToUpload = fileData.toString('base64');
    } else {
      // If it's a file path, read the file
      fileToUpload = fs.readFileSync(fileData);
    }
    
    const response = await imagekit.upload({
      file: fileToUpload,
      fileName: fileName,
      folder: '/uploads' // Optional: organize files in folders
    });
    
    console.log('File uploaded successfully:', response.url);
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Export the function so you can use it in other files
module.exports = {
  uploadFile,
  imagekit
};