const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
          template: "./index.pug"
        }),
      ],
      module: {
        rules: [
          {
            test: /\.pug$/,
            use: [
              {
                loader: "simple-pug-loader",
              },
            ],
          },
        ],
      }
};