const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const paths = "./paths.js";


module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: paths.dist,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
});
