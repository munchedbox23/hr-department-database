import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers(
  options: BuildOptions
): webpack.Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"],
    preferAbsolute: true,
    modules: [options.paths.src, "node_modules"],
    mainFiles: ["index"],
    alias: {
      "@": options.paths.src,
    },
  };
}
