export type BuildMode = "production" | "development";

export interface BuildPaths {
  entry: string;
  output: string;
  public: string;
  html: string;
  src: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  project: "storybook" | "frontend" | "jest";
}
