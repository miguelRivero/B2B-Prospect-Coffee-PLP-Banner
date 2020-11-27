const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

require("regenerator-runtime/runtime");

module.exports = (env) => {
  env = env ? env : {};
  return {
    optimization: {
      splitChunks: env.production
        ? {
            chunks: "async",
          }
        : {
            chunks: "all",
            minSize: 12000,
            maxSize: 21000,
          },
    },
    entry: env.production
      ? {
          Translations: ["./src/data/translations.js"],
          Styles: ["./src/styles/index.scss"],
          ProspectBannerCode: ["./src/scripts/index.js"],
        }
      : {
          ProspectBannerCode: [
            "./src/data/translations.js",
            "./src/scripts/index.js",
            "./src/styles/index.scss",
          ],
        },
    // entry: [
    //   "./src/data/translations.js",
    //   "./src/scripts/index.js",
    //   "./src/styles/index.scss",
    // ],
    //entry: ["./src/scripts/index.js", "./src/styles/index.scss"],
    // entry: {
    //   VariantA: [
    //     "./src/js/contentA.js",
    //     "./src/scripts/index.js",
    //     "./src/styles/main.scss",
    //   ],
    //   VariantB: [
    //     "./src/js/contentB.js",
    //     "./src/scripts/index.js",
    //     "./src/styles/main.scss",
    //   ],
    //   VariantC: [
    //     "./src/js/contentC.js",
    //     "./src/scripts/index.js",
    //     "./src/styles/main.scss",
    //   ],
    // },
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      //chunkFilename: "[name].bundle.js",
      publicPath: "/dist",
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "ie 11",
                    loose: true,
                    useBuiltIns: "entry",
                    corejs: 3,
                  },
                ],
              ],
              plugins: [
                ["transform-remove-console", { exclude: ["error", "warn"] }],
                "transform-async-to-promises",
              ],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: env.production
            ? [
                //MIniCSSExtract used for separating a css file. If want to disable use just "style-loader"
                MiniCssExtractPlugin.loader,
                // Creates `style` nodes from JS strings
                //"style-loader",
                // Translates CSS into CommonJS
                {
                  loader: "css-loader",
                  options: {
                    url: false,
                  },
                },
                // Compiles Sass to CSS
                "sass-loader",
              ]
            : [
                {
                  loader: "file-loader",
                  options: { outputPath: "css/", name: "[name].min.css" },
                },
                // Compiles Sass to CSS
                "sass-loader",
              ],
        },
      ],
    },
    // devServer: {
    //   contentBase: path.join(__dirname, "public"),
    //   publicPath: "http://localhost:8080/scripts/",
    //   port: 8080,
    // },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new MinifyPlugin(),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: "src/data", to: "data" }],
      }),
    ],
  };
};
