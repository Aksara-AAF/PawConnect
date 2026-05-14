const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { redisClient } = require('../config/redis');
const crypto = require('crypto');

const register = async (userData) => {
  const existingUser = await userModel.findByEmail(userData.email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(userData.password, saltRounds);

  const newUser = await userModel.create({
    name: userData.name,
    email: userData.email,
    password_hash: passwordHash,
    phone: userData.phone,
    is_verified_shelter: userData.is_verified_shelter
  });

  return newUser;
};

const login = async (email, password) => {
  const user = await userModel.findByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate session token
  const sessionToken = crypto.randomBytes(32).toString('hex');
  
  // Store in Redis (valid for 24 hours)
  const sessionData = JSON.stringify({ userId: user.id, email: user.email });
  await redisClient.setEx(`session:${sessionToken}`, 86400, sessionData);

  const { password_hash, ...userWithoutPassword } = user;
  
  return {
    user: userWithoutPassword,
    sessionToken
  };
};

const logout = async (sessionToken) => {
  if (sessionToken) {
    await redisClient.del(`session:${sessionToken}`);
  }
};

module.exports = {
  register,
  login,
  logout
};