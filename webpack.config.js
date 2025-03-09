const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production', // Use "development" for debugging
  entry: {
    contentScript: './src/contentScript.js',
    // popup: './src/popup.js',
    // background: './src/background.js',
  },
  output: {
    filename: '[name].bundle.js', // Corrected: [ext] is not needed here
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/, // Match HTML files
        use: 'html-loader', // Use html-loader to handle HTML files
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './src/popup.html',
    //   filename: 'popup.bundle.html',
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './manifest.json', to: 'manifest.json' },
        {
          from: './src/logos/logo_size_*.png',
          to: '[name][ext]', // This works for static files like images
        },
        // {
        //   from: './src/html/*',
        //   to: '[name][ext]',
        // },
        {
          from: './src/globalStyles.css', // Copy CSS file
          to: 'globalStyles.bundle.css', // Place directly in `dist/`
        },
      ],
    }),
  ],
};
