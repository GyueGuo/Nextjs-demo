const withLess = require('@zeit/next-less');

// module.exports = withLess({
//   webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
//     return config
//   },
// });

module.exports = withLess({
  lessLoaderOptions : {
    javascriptEnabled : true
  },
  webpack: (config) => {
    // config.module.rules.push({
    //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    //   loader: 'url-loader',
    //   options: {
    //     limit: 10000,
    //   }
    // });
    return config
  }
})