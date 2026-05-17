const { redisClient } = require('../config/redis');
const { error } = require('../utils/responseHelper');

const authenticate = async (req, res, next) => {
  try {
    const sessionToken = req.cookies.sessionId;
    
    if (!sessionToken) {
      return error(res, 'Unauthorized - No session token', 401);
    }
    
    const sessionData = await redisClient.get(`session:${sessionToken}`);
    if (!sessionData) {
      return error(res, 'Unauthorized - Invalid or expired session', 401);
    }
    
    const user = JSON.parse(sessionData);
    req.user = user; // { userId, email, role }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authenticate
};