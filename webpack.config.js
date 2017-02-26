var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var openBrowserPlugin = require('open-browser-webpack-plugin');
var config = require('./webpack.port.config');
module.exports = {
    devtool: 'eval-source-map',
    entry:  __dirname + "/index.js",
    output: {
        path: __dirname + "/tmpl",
        filename: "bundle.js"
    },

    module:{
      loaders:[
          {
              test:/\.js$/,
              exclude:/node_modules/,
              loader:'babel'
          },
          {
              test:/\.css$/,
              loader:'style!css?!postcss'
          }
      ]
    },

    devServer: {
        contentBase: "./tmpl",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot:true
    },
    postcss:[
        autoprefixer({browsers:['last 10 versions']})
    ],

    plugins:[
        new webpack.BannerPlugin('Copyright Chvin'),
        new webpack.HotModuleReplacementPlugin(),
        new openBrowserPlugin({ url: config.startUrl })
    ]
}