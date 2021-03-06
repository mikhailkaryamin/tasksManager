const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000,
    watchContentBase: true,
    open: true,
  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }
    ]
  },
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `build`),
    publicPath: path.join(__dirname, `public`)
  },
};
