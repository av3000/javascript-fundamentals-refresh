// TODO: Add plugins for extra efficiency
// https://webpack.js.org/plugins/commons-chunk-plugin/
// https://github.com/webpack-contrib/mini-css-extract-plugin
// https://github.com/webpack-contrib/compression-webpack-plugin

import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

export default {
  entry: {
    main: path.join(__dirname, "index.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "assets/css")],
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
      favicon: path.join(__dirname, "assets/img/javascript-js.svg"),
    }),
    new ESLintPlugin({
      extensions: ["js"],
      emitError: true,
      emitWarning: true,
      failOnError: false,
      failOnWarning: false,
    }),
  ],
  // stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: false,
    compress: true,
    historyApiFallback: true,
    port: 4000,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
};
