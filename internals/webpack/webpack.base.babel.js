/**
 * COMMON WEBPACK CONFIGURATION
 */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true;

const isElectron = process.env.TARGET === 'electron';

// Create bindings for native node modules when running in Electron
// supress false positive warnings when running in browser environment
const externals = isElectron
  ? {
    'node-hid': 'require("node-hid")',
    bindings: 'require("bindings")',
  }
  : {
    'node-hid': 'empty',
    bindings: 'empty',
  };

// Expose APIs for the environment targeted
const target = isElectron
  ? 'electron-renderer'
  : 'web';

// Supress false positive warnings during browser build
const node = !isElectron
  ? {
    fs: 'empty',
    bindings: 'empty',
    child_process: 'empty',
  }
  : {};

const getAdditionalAlias = (options) => options.resolve ? options.resolve.alias : {};

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js/.jsx files required somewhere with Babel
        exclude: /node_modules/,
        include: /src/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({ 'global.GENTLY': false }),

    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CONTRACT_PATH: JSON.stringify(process.env.CONTRACT_PATH),
        PUBLISH_REPO: JSON.stringify(process.env.npm_package_build_publish_0_repo),
        PUBLISH_OWNER: JSON.stringify(process.env.npm_package_build_publish_0_owner),
        ROPSTEN_IDENTITY_SERVICE_APPID: JSON.stringify(process.env.ROPSTEN_IDENTITY_SERVICE_APPID),
        MAINNET_IDENTITY_SERVICE_APPID: JSON.stringify(process.env.MAINNET_IDENTITY_SERVICE_APPID),
        ROPSTEN_IDENTITY_SERVICE_SECRET: JSON.stringify(process.env.ROPSTEN_IDENTITY_SERVICE_SECRET),
        MAINNET_IDENTITY_SERVICE_SECRET: JSON.stringify(process.env.MAINNET_IDENTITY_SERVICE_SECRET),
      },
    }),
    new CopyWebpackPlugin(
      [
        { from: 'public/', to: 'public/' },
      ]
    ),
  ]),
  resolve: {
    modules: [
      'node_modules',
      'src',
    ],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
      '.css',
      '.less',
      '.json',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
    alias: {
      moment$: 'moment/moment.js',
      inherits: 'inherits/inherits_browser.js',
      superagent: 'superagent/lib/client',
      emitter: 'component-emitter',
      ...getAdditionalAlias(options),
    },
  },
  devtool: options.devtool,
  externals,
  target,
  node,
  performance: options.performance || {},
});
