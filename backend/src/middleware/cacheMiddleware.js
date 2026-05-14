const { redisClient } = require('../config/redis');

const cachePets = async (req, res, next) => {
  try {
    const cacheKey = `cache:${req.originalUrl || req.url}`;
    
    // Attempt to retrieve data from cache
    const cachedData = await redisClient.get(cacheKey);
    
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    
    // If not cached, override res.json to cache the output before sending
    const originalJson = res.json;
    res.json = function(body) {
      // Restore original res.json
      res.json = originalJson;
      
      // Cache only if success
      if (res.statusCode === 200 && body.success) {
        // Cache for 5 minutes
        redisClient.setEx(cacheKey, 300, JSON.stringify(body))
          .catch(err => console.error('Redis cache set error:', err));
      }
      
      return res.json(body);
    };
    
    next();
  } catch (err) {
    // If Redis error (e.g. disconnected), proceed without caching
    console.error('Redis cache error:', err);
    next();
  }
};

const invalidatePetsCache = async () => {
  try {
    // Invalidate all keys matching cache:/api/pets*
    const keys = await redisClient.keys('cache:/api/pets*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    console.error('Redis cache invalidation error:', err);
  }
};

module.exports = {
  cachePets,
  invalidatePetsCache
};