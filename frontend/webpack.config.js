const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Ensure proper handling of expo-router
  config.resolve.alias = {
    ...config.resolve.alias,
  };

  return config;
};
