import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.output,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
