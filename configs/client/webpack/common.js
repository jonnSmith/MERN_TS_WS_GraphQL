// shared config (dev and prod)
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, './../../../client/src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader?{configFileName: "./client/tsconfig.json"}'],

      },
      {
        test: /\.ts?$/,
        use: ['babel-loader', 'awesome-typescript-loader?{configFileName: "./client/tsconfig.json"}'],
        exclude: "/node_modules"
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader', options: { injectType: 'linkTag', insert: 'body' } },
          { loader: 'file-loader' },
        ],
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'index.html.ejs',}),
    new FaviconsWebpackPlugin({
      logo: './assets/img/logo.svg',
      publicPath: './',
      outputPath: './',
    })
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  performance: {
    hints: false,
  },
};
