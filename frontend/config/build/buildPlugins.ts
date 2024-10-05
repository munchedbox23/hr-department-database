import CircularDependencyPlugin from 'circular-dependency-plugin';
import webpack, { Configuration, DefinePlugin, ProgressPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";

export function buildPlugins({
  isDev,
  project,
  paths,
}: BuildOptions): Configuration["plugins"] {
  const isProd = !isDev;

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, "favicon.ico"),
    }),
    new ProgressPlugin(),
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __PROJECT__: JSON.stringify(project),
    }),
  ];

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
      })
    );
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
  }

  return plugins;
}
