const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};

const validateRequired = (fields, data) => {
  return fields.filter((field) => !data[field] && data[field] !== 0);
};

const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/[<>]/g, '');
};

module.exports = { validateEmail, validateRequired, sanitizeInput };
