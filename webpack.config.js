const path = require('path');

module.exports = {
  mode: 'production', // Use "development" for debugging
  entry: './content-script.js', // Main script entry point
  output: {
    filename: 'content-script.bundle.js', // The bundled output file
    path: path.resolve(__dirname),
  },
};
