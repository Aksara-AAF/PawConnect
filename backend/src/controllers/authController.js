const authService = require('../services/authService');
const { success, error } = require('../utils/responseHelper');

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, is_verified_shelter } = req.body;
    
    if (!name || !email || !password) {
      return error(res, 'Name, email, and password are required', 400);
    }
    
    const user = await authService.register({ name, email, password, phone, is_verified_shelter });
    return success(res, user, 'Registration successful', 201);
  } catch (err) {
    if (err.message === 'Email already registered') {
      return error(res, err.message, 409);
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return error(res, 'Email and password are required', 400);
    }
    
    const { user, sessionToken } = await authService.login(email, password);
    
    // Set cookie
    res.cookie('sessionId', sessionToken, {
      httpOnly: true,
      maxAge: 86400 * 1000, // 24 hours
      secure: true,
      sameSite: 'none'
    });
    
    return success(res, user, 'Login successful', 200);
  } catch (err) {
    if (err.message === 'Invalid credentials') {
      return error(res, err.message, 401);
    }
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const sessionToken = req.cookies.sessionId;
    await authService.logout(sessionToken);
    
    res.clearCookie('sessionId', { httpOnly: true, secure: true, sameSite: 'none' });
    return success(res, null, 'Logout successful', 200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout
};