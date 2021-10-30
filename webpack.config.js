const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + ' mode')


module.exports = {
    mode: "development",
    entry: './src/app.js',
    output: {
        filename: '[name].[contenthash].js',
        //path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
    },
    optimization: {
      splitChunks: {
          chunks: 'all',
      },
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
            exclude: /(node_modules|bower_components)/,
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
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        ],
      },    
};