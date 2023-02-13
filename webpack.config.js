const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeysValues = Object.keys(env).reduce((acc, current) => {
    acc[`process.env.${current}`] = JSON.stringify(env[current]);
    return acc;
  }, {});

  return {
    entry: path.resolve(appDirectory, "src/index.tsx"),

    devtool: "source-map",

    output: {
      path: path.resolve("./dist/"),
      filename: "bundle.js",
      publicPath: "/",
    },

    devServer: {
      historyApiFallback: true,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": path.resolve("./src"),
        "@hooks": path.resolve("./src/hooks"),
        "@components": path.resolve("./components"),
      },
    },

    plugins: [
      new HTMLWebpackPlugin({
        inject: true,
        template: path.resolve(appDirectory, "public/index.html"),
    }),
      new webpack.DefinePlugin(envKeysValues),
    ],

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpg|gif|env|glb|gltf|stl)$/i,
          use: [
              {
                  loader: "url-loader",
                  options: {
                      limit: 8192,
                  },
              },
          ],
        },
      ],
    },
  };
};
