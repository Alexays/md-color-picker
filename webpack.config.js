let path = require('path');
const webpack = require('webpack');
let BUILD_DIR = path.resolve(__dirname, 'lib');
let APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: [
    APP_DIR + '/index.js'
  ],
  resolve: { extensions: ['.ts', '.js', '.json', '.css', '.scss', '.less', '.html'] },
  output: {
    path: BUILD_DIR,
    filename: 'MdColorPicker.js',
    library: 'MdColorPicker',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules\/(?!(@material)\/).*/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015']
      }
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader",
        options: {
          includePaths: ['node_modules', 'src']
        }
      }]
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader',
    }
    ],
  },
  plugins: [
  ]
}