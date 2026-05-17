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

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('sessionId', sessionToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
      secure: isProduction,          // true di HTTPS (Vercel)
      sameSite: isProduction ? 'none' : 'lax', // 'none' agar bisa cross-origin
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

    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie('sessionId', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    });
    return success(res, null, 'Logout successful', 200);
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const userModel = require('../models/userModel');
    const user = await userModel.findById(req.user.userId);
    if (!user) return error(res, 'User tidak ditemukan', 404);
    return success(res, user, 'Profil berhasil diambil');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe
};