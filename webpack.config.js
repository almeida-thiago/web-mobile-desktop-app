const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const prod = process.env.NODE_ENV === 'production'
const mode = prod ? 'production' : 'development'

module.exports = [
  {
    target: 'electron-main',
    mode,
    entry: {
      electron: path.resolve(__dirname, 'src', 'desktop', 'electron.ts'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist', 'desktop'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    devtool: prod ? undefined : 'source-map',
  },
  {
    mode,
    entry: path.resolve(__dirname, 'src', 'desktop', 'index.tsx'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist', 'desktop'),
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    devtool: prod ? undefined : 'source-map',
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin(),
      new NodePolyfillPlugin(),
    ],
  },
  {
    mode,
    entry: path.resolve(__dirname, 'src', 'web', 'index.tsx'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist', 'web'),
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    devtool: prod ? undefined : 'source-map',
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin(),
      new NodePolyfillPlugin(),
    ],
  },
]
