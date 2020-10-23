const path = require("path");

module.exports = {
  entry: [
    "./src/scripts/translations.js",
    "./src/scripts/index.js",
    "./src/styles/index.scss",
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "global",
    publicPath: "https://localhost:8080/",
  },
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
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
  devServer: {
    https: true,
    contentBase: path.join(__dirname, "..", "public"),
    compress: true,
    port: 8080,
    disableHostCheck: true,
    open: true,
  },
};
