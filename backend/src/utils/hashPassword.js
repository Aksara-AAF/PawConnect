const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

const comparePassword = async (plainPassword, hash) => {
  return await bcrypt.compare(plainPassword, hash);
};

module.exports = { hashPassword, comparePassword };
