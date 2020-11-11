const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        test: /\.(s*)css$/,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
         {
            loader:'css-loader',
            options: {
                 url: false
            }
         },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    //new CopyPlugin([{ from: "src/assets", to: "public" }]),
    //new CleanWebpackPlugin(),
  ],
};
