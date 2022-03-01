const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  // devServer: {
  //   static: './dist',
  // },
  optimization: {
    usedExports: true,
  },

  entry: {
    index: './src/index.js',
    sw: './src/sw.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      favicon: './src/logo/logo32.png',
      filename: 'index.html',
      title: 'document',
      template: './src/index.html',
      // minify: {
      // collapseWhitespace: true,
      //   removeComments: true,
      // },
    }),

    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./dist directory is being served
      host: 'localhost',
      port: 2000,
      server: { baseDir: ['dist'] },
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'Social Skills',
      short_name: 'Social Skills',
      description: 'App to help improve social skills',
      background_color: '#E8DB7D',
      display: 'standalone',
      start_url: '.',
      icons: [
        {
          src: path.resolve('src/logo/logo48.png'),
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: path.resolve('src/logo/logo72.png'),
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: path.resolve('src/logo/logo96.png'),
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: path.resolve('src/logo/logo144.png'),
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: path.resolve('src/logo/logo168.png'),
          sizes: '168x168',
          type: 'image/png',
        },
        {
          src: path.resolve('src/logo/logo192.png'),
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    }),
  ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
