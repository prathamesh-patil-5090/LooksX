const config = {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URL || 'your_mongodb_uri',
  // Add other configuration variables
};

module.exports = config;
