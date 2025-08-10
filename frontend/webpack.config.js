const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@lucide/lab', 'lucide-react-native']
      }
    },
    argv
  );

  // Add support for path aliases
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': __dirname,
  };

  return config;
};
