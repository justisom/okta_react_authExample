const path = require("path");
// const webpack = require("webpack");
// const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const Dotenv = require("dotenv-webpack");

const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");
let CompressionPluginBrotli = new CompressionPlugin({
  filename: "[path][base].br[query]",
  algorithm: "brotliCompress",
  test: /\.(js|css|html|svg)$/,
  compressionOptions: {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    },
  },
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
});

let CompressionPluginGzip = new CompressionPlugin({
  filename: "[path][base].gz[query]",
  algorithm: "gzip",
  test: /\.(js|css|html|svg)$/,
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
});


// ============================================================================
module.exports = {
  devtool: "source-map",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },      
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    },
    minimize: true,
  },
  plugins: [
    new Dotenv({ignoreStub:true,}),
    CompressionPluginBrotli,
    CompressionPluginGzip,
    // new WebpackBundleAnalyzer()
  ],
};