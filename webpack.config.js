let path = require('path');
let BUILD_DIR = path.resolve(__dirname, 'lib');
let APP_DIR = path.resolve(__dirname, 'src');
let MODULE_DIR = path.resolve(__dirname, 'node_modules/@material');
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
  entry: [
    APP_DIR + '/index.jsx'
  ],
  devtool: 'source-map',
  output: {
    path: BUILD_DIR,
    filename: 'MdColorPicker.jsx',
    library: 'MdColorPicker',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  stats: {
    warnings: false,
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      include: [MODULE_DIR, APP_DIR],
      use: [
        'babel-loader',
      ],
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
    new BabiliPlugin()
  ]
}