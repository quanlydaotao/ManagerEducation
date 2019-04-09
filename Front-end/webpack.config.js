const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');

const devServer = {
   port: 5000,
   open: false,
   disableHostCheck: true,
   historyApiFallback: true,
   overlay: true,
   stats: 'minimal',
   inline: true,
   compress: true,
   contentBase: '/'
};

module.exports = {
   
   optimization: {
      runtimeChunk: 'single',
      splitChunks: {
         cacheGroups: {
            commons: {
               test: /[\\/]node_modules|assets[\\/]/,
               name: 'vendor',
               chunks: 'all',
            }
         }
      },
      minimizer: [
         new UglifyJsPlugin({
            sourceMap: false,
            cache: true,
            parallel: true
         }),
         new OptimizeCSSAssetsPlugin({})
      ]
   },
   plugins: [
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': '"production"'
      }),
      new CompressionPlugin({
         test: /\.js$|\.css$|\.html$/,
         filename: "[path].gz[query]",
         algorithm: "gzip",
         threshold: 10240,
         minRatio: 0.8
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin({
         filename: '[name].[chunkhash].bundle.css',
         chunkFilename: '[name].[chunkhash].bundle.css'
      }),
      new webpack.ProvidePlugin({
         '$': 'jquery',
         'jQuery': 'jquery',
         'window.$': 'jquery',
         'window.jQuery': 'jquery'
      }),
      new HtmlWebpackPlugin({
         inject: true,
         hash: false,
         template: './src/assets/index.html',
         filename: 'index.html',
         minify: {
            collapseWhitespace: true
         }
      }),
   ],
   // Config io and loader file
   devtool: 'source-map',
   entry: {
      main: "./src/index.js",
   },
   output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[chunkhash].bundle.js',
      chunkFilename: '[name].[chunkhash].bundle.js',
      // publicPath: 'http://localhost/4000'
   },
   resolve: {
      extensions: ['*', '.js', '.jsx'],
      modules: [
         path.resolve('./'),
         path.resolve('./node_modules'),
      ]
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            use: ['cache-loader', 'babel-loader'],
            exclude: '/node_modules/'
         },
         {
            test: /\.(sa|sc|c)ss$/,
            exclude: /(assets|node_modules)/,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: "css-loader",
                  options: {
                     modules: true,
                     localIdentName: '[local]_[hash:base64:5]',
                     sourceMap: true
                  }
               },
               {
                  loader: "sass-loader",
                  options: {
                     module: true,
                     sourceMap: true
                  }
               }
            ]
         },
         {
            // test: /^((?!\.module).)*\.(sa|sc|c)ss$/,
            test: /\.(sa|sc|c)ss$/,
            include: /(assets|node_modules)/,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: "css-loader",
                  options: {
                     modules: false,
                     sourceMap: true
                     // sourceMap: true,
                     // localIdentName: '[name]__[local]__[hash:base64:5]'
                  }
               },
               {
                  loader: "sass-loader",
                  options: {
                     module: false,
                     sourceMap: true
                  }
               }
            ]
         },
         {
            test: /\.(jpg|jpeg|png|gif|ico|mp3|woff|woff2|eot|ttf|svg)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[sha512:hash:base64:7].[ext]'
                  },
               },
            ],
            exclude: '/node_modules/'
         }
      ]
   },
   performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
   },
   devServer

};
