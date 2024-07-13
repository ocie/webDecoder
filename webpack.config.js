const path = require('path');

module.exports = {
  entry: './src/background/background.js',
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
