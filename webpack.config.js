module.exports = {
  entry: "./App/app.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        include: /App/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      }]
  },
  devtool: "eval-source-map"
};
