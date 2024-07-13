const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: {
      import: './src/background/background.js',
      filename: 'background.js'
    },
    content: {
      import: './src/content/content-script.js',
      filename: 'content-script.js'
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/popup/popup.html", to: path.resolve(__dirname, 'dist') },
        { from: "**/*", context: path.resolve(__dirname, "src", "assets"), to: path.resolve(__dirname, 'dist') },
        { from: "./src/content/content-script.css", to: path.resolve(__dirname, 'dist')}
      ],
      options: {
        concurrency: 100,
      },
    }),
  ]
};
