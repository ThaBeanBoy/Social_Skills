const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
var WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    sw: './src/sw.js',
  },

  plugins: [
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
});
