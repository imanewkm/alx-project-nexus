const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable web support
config.resolver.platforms = ['web', 'ios', 'android', 'native'];

// Add support for path aliases in web builds
config.resolver.alias = {
  '@': __dirname,
};

module.exports = config;
