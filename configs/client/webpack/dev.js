// development config
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  mode: 'development',
  target: "web",
  context: path.join(__dirname, './../../../client'),
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, '../../../build/client'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  },
  resolve: {
    modules: ['node_modules', '@appchat', '@shared', '@configs'],
    alias: {
      "react-dom": "@hot-loader/react-dom",
      "@appchat": "/src",
      "@appchat/ui": "/src/ui",
      "@appchat/core": "/src/core",
      "@appchat/data": "/src/data",
      "@shared": "/../shared",
      "@shared/*": "/../shared/*",
      "@configs": "/../configs",
      "@configs/*": "/../configs/*",
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
  },
  optimization: {
    moduleIds: "named",
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {targets: {browsers: 'last 2 versions'}}, // or whatever your project requires
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", {legacy: true}],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ["@babel/plugin-transform-typescript", { onlyRemoveTypeImports: true, allowNamespaces: true, isTSX: true }],
              ["@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ],
              'react-hot-loader/babel',
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader', options: { injectType: 'linkTag', insert: 'body' } },
          { loader: 'file-loader' },
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html.ejs',}),
    new FaviconsWebpackPlugin({
      logo: './src/assets/img/logo.svg',
      publicPath: './',
      outputPath: './',
    }),
    new webpack.ContextReplacementPlugin(/any-promise/)
  ],
};
