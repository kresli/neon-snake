const path = require("path");

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", { flow: false, typescript: true }]],
    },
  });
  // config.module.rules.push({
  //   test: /\.scss$/,
  //   loaders: ["style-loader", "css-loader", "sass-loader"],
  //   include: path.resolve(__dirname, ".."),
  // });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
