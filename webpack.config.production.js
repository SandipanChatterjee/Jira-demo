const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(png|jpe?g|gif|json|ico)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG: false,
      REACT_APP_API_URL: "https://jira-api.ivorreic.com/",
    }),

    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
