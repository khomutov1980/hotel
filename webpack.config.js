const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: './src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
    },
      module: {
        rules: [
          {
            test: /\.html$/i,
            loader: "html-loader",
            },
          {
            test: /\.pug$/,
            use: [
              {
                loader: "simple-pug-loader",
              },
            ],
          },
          {
              test: /\.(sa|sc|c)ss$/,
              use: [
                  // fallback to style-loader in development
                    process.env.NODE_ENV !== "production"
                    ? "style-loader"
                     :MiniCssExtractPlugin.loader,
                  "css-loader",
                  {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "postcss-preset-env",
                                    {
                                        // Options
                                    },
                                ],
                            ],
                        },
                    },
                },
                  "sass-loader",
              ],
          },
        ],
      },    
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.pug"
        }),
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
          //chunkFilename: "[id].css",
        })
      ],

};