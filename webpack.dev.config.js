const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: ["@babel/polyfill", "./src/public/index.js"],
  },
  output: {
    path: path.join(__dirname, "dist/public"),
    publicPath: "/",
    filename: "js/[name].js",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  target: "web",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/public/index.html",
      filename: "index.html",
      excludeChunks: ["server"],
    }),
    new CopyPlugin({
      patterns: [{ from: "src/public/img", to: "img/[name][ext]" }],
    }),
  ],
};
