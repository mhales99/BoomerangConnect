const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

// Check if public directory exists
const publicDirExists = fs.existsSync(path.join(__dirname, 'public'));

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!(@react-native|react-native)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              ["@babel/plugin-transform-private-methods", { "loose": true }],
              ["@babel/plugin-transform-private-property-in-object", { "loose": true }]
            ]
          },
        },
      },
      {
        // Handle Flow type syntax in node_modules
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'node_modules/@react-native'),
          path.resolve(__dirname, 'node_modules/react-native'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
            plugins: [
              ["@babel/plugin-transform-flow-strip-types"],
              ["@babel/plugin-transform-private-methods", { "loose": true }],
              ["@babel/plugin-transform-private-property-in-object", { "loose": true }]
            ]
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
    ...(publicDirExists ? [
      new CopyPlugin({
        patterns: [
          { 
            from: 'public',
            to: '.',
            globOptions: {
              ignore: ['**/index.html'],
            },
            noErrorOnMissing: true,
          },
        ],
      }),
    ] : []),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: true,
  },
};