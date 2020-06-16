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
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};
