/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBarPlugin = require("webpackbar");
const WebResourcePublisherPlugin = require("./webResourcePublisherPlugin");
const TerserPlugin = require("terser-webpack-plugin");
const fs = require("fs");

require("dotenv").config();
// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = ({ publish } = env, { mode } = argv) => {
  const isProduction = mode && mode === "production";
  const shouldPublish = !!publish;
  const xrmQueryWebMin = resolveApp("./scripts/dg.xrmquery.web.min.js");
  const xrmQueryWebPromise = resolveApp("./scripts/dg.xrmquery.web.promise.min.js");

  return {
    entry: {
      entityLogic: "./src/entities/entity-loader.ts",
      "playground-app": "./src/apps/playground-react-app/index.tsx",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../_xrm-deployment"),
    },
    devServer: {
      contentBase: path.join(__dirname, "../_xrm-deployment"),
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", ".less"],
      alias: {
        "dg.xrmquery.web": xrmQueryWebMin,
        "dg.xrmquery.web.promise": xrmQueryWebPromise,
      },
    },
    devtool: false,
    plugins: [
      new WebpackBarPlugin(),
      new HtmlWebpackPlugin({
        template: "src/apps/playground-react-app/index.html",
        filename: "playground-app.html",
        chunks: ["playground-app"],
        inject: "body",
      }),
      !isProduction &&
        new webpack.SourceMapDevToolPlugin({
          test: /\.js$/,
          filename: "[name].map.js",
        }),
      shouldPublish && new WebResourcePublisherPlugin(),
    ].filter((plugin) => plugin !== false),
  };
};
