const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production', // Use "development" for debugging
  entry: {
    contentScript: './src/contentScript.js', // Main script entry point inside src
    popup: './src/popup.js', // Add popup.js entry inside src
    background: './src/background.js', // Add popup.js entry inside src
  },
  output: {
    filename: '[name].bundle.js', // Use [name] to dynamically create different bundle names for each entry
    path: path.resolve(__dirname, 'dist'), // Output to dist folder
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup.html', // Use popup.html from src as template
      filename: 'popup.bundle.html', // Output the HTML file with the correct name
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './manifest.json', to: 'manifest.json' }, // Copy manifest.json to dist
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/logos/logo_size_*.png', // Source with wildcard
          to: '[name][ext]', // Copy and keep the original filename and extension
        },
      ],
    }),
  ],
};
