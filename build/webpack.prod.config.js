const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Config = require('../src/config.js')
const pkg = require('../package.json')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
process.env.NODE_ENV = 'production'
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: `${Config.filename}.min.js`,
    library: Config.library,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: ExtractTextPlugin.extract({
              use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
              fallback: 'vue-style-loader'
            }),
            css: ExtractTextPlugin.extract({
              use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { importLoaders: 1 } }]
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize',
            'less-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    // browsers 指定 autoprefixer 所需要兼容的浏览器版本
                    overrideBrowserslist: ['last 2 version', 'ie > 8']
                  })
                ]
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(svg|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          publicPath: 'fonts',
          outputPath: 'styles/fonts'
        }
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), new ExtractTextPlugin('styles/[name].css')],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@src': path.join(__dirname, '../src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      'process.env.VERSION': `'${pkg.version}'`
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
