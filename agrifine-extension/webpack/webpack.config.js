const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-module-source-map',
  entry: {
    background: path.join(srcDir, 'background', 'index.js'),
    content: path.join(srcDir, 'content', 'index.js'),
    sidebar: path.join(srcDir, 'sidebar', 'index.js'),
  },
  output: {
    path: distDir,
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new CopyPlugin({
      patterns: [
        { from: path.join(publicDir, 'icons'), to: path.join(distDir, 'icons') },
        { from: path.join(rootDir, 'manifest.json'), to: distDir },
        { from: path.join(srcDir, 'sidebar', 'sidebar.html'), to: path.join(distDir, 'sidebar.html') },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': srcDir,
    },
  },
};
