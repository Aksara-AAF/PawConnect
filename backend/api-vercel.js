const app = require('./src/app');
const { connectRedis } = require('./src/config/redis');

connectRedis().catch(console.error);

module.exports = app;