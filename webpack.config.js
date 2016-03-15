const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');


const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATH = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app:  PATH.app
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATH.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATH.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATH.app
      }
    ]
  }
};

if(TARGET === 'start' || !TARGET){
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATH.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      cache: true,
      status: 'errors-only',
      host: (process.env.HOST || '0.0.0.0'),
      port: process.env.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true
      })
    ],
    watchOptions: {
      poll: true
    }
  });
}

if(TARGET === 'build'){
  module.exports = merge(common, {});
}
