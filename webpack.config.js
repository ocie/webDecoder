const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: "inline-source-map",
  resolve: {
    extensions: ['.ts']
  },
  entry: {
    'background': path.resolve(__dirname, './src/background/background.ts'),
    'content-script' : path.resolve(__dirname, './src/content/content-script.ts')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/popup/popup.html", to: path.resolve(__dirname, 'dist') },
        { from: "**/*", context: path.resolve(__dirname, "src", "assets"), to: path.resolve(__dirname, 'dist') },
        { from: "./src/content/content-script.css", to: path.resolve(__dirname, 'dist')},
        { from: "./src/popup/popup.css", to: path.resolve(__dirname, 'dist')},
      ],
      options: {
        concurrency: 100,
      },
    }),
  ]
};
