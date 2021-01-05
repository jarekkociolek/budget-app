const path = require("path");
const webpack = require("webpack");
const HtpmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  //CORE config settings
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", //allow us to see the code
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  //CORE config settings
  //DEVSERVER config settings
  devServer: {
    stats: "minimal",
    overlay: true, //overlay errors to the browser,
    historyApiFallback: true, //send all requests to index.html
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  //DEVSERVER config settings
  module: {
    //which file we wanna to handle
    rules: [
      {
        test: /\.(js|jsx)$/, //look for either js or jsx files
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // resolve: { extensions: ["*", ".js", ".jsx"] },
  plugins: [
    new HtpmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    })
  ],
};
