const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

//const nodeExternals = require('webpack-node-externals')

const isProd = true
const way = path.resolve(__dirname, './public');

let plugins = [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
        title: 'Trainee React Test Site',
        template: path.resolve(way,'./index.ejs'),
        production: isProd,
        inject: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
        filename: '[hash].css',
        allChunks: true
    })
]

module.exports = function (env) {
  return {
    devtool: 'source-map',
    context: way,
    entry: {
      js: 'index'
    },
    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [ {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]'
          }
        }
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                require.resolve('babel-preset-es2015'),
                require.resolve('babel-preset-react'),
                require.resolve('babel-preset-stage-1')
              ],
              plugins: [
                require.resolve('babel-plugin-transform-runtime'),
                require.resolve('babel-plugin-react-html-attrs')
              ],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader']
          })
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      {
        test: /\.(ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        way,
        'node_modules'
      ],
      alias: {
        jquery: 'jquery/src/jquery'
      }
    },
    plugins: plugins
  }
}
