const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const mode = "development" || "production" || "test";

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
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
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: mode,
      DEBUG: false,
      REACT_APP_API_URL: "https://jira-api.ivorreic.com/",
    }),
  ],
};
