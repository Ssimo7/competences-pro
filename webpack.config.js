const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    competencesPro: path.resolve(__dirname, 'src/app/index.js'),
    situationControle: path.resolve(__dirname, 'src/app/situationControle.js'),
    situationInventaire: path.resolve(__dirname, 'src/app/situationInventaire.js'),
    restitutionSituationInventaire: path.resolve(__dirname, 'src/app/restitutionSituationInventaire.js')
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].js',
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  resolve: {
    alias: {
      accueil: path.resolve(__dirname, 'src/situations/accueil/'),
      commun: path.resolve(__dirname, 'src/situations/commun/'),
      controle: path.resolve(__dirname, 'src/situations/controle/'),
      inventaire: path.resolve(__dirname, 'src/situations/inventaire/'),
      src: path.resolve(__dirname, 'src/')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, 'src/app')],
        loader: 'babel-loader',

        options: {
          plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-object-rest-spread'],

          presets: [
            [
              '@babel/env',
              {
                modules: false
              }
            ]
          ]
        },

        test: /\.js$/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|mp3)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[sha512:hash:base64:7]',
              outputPath: 'assets',
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      template: path.resolve(__dirname, 'src/public/template_index.html'),
      chunks: ['competencesPro'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: 'controle.html',
      hash: true,
      template: path.resolve(__dirname, 'src/public/template_index.html'),
      chunks: ['situationControle'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: 'inventaire.html',
      hash: true,
      template: path.resolve(__dirname, 'src/public/template_index.html'),
      chunks: ['situationInventaire'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: 'restitution.html',
      hash: true,
      template: path.resolve(__dirname, 'src/public/template_index.html'),
      chunks: ['restitutionSituationInventaire'],
      inject: 'head'
    }),
    new webpack.ProvidePlugin({ jQuery: 'jquery' })
  ],
  devServer: {
    contentBase: './src/public',
    port: 7700
  }
};
