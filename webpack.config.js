const path = require('path');

module.exports = {
  entry: './server', // Update this path to your actual entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production'
};