const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Fix expo-router app directory resolution
  config.resolve.alias = {
    ...config.resolve.alias,
    'app': path.resolve(__dirname, 'app'),
  };

  // Ensure proper module resolution for expo-router
  config.resolve.modules = [
    path.resolve(__dirname),
    'node_modules'
  ];

  // Add fallback for problematic modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "fs": false,
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
  };

  return config;
};
