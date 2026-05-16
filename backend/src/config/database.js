const { Pool } = require('pg');

const isLocal = !process.env.DATABASE_URL;

const pool = new Pool(
  isLocal
    ? {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
    : {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
);

pool.query('SELECT NOW()')
  .then(() => console.log('Connected to Neon PostgreSQL!'))
  .catch((err) => console.error('PostgreSQL connection error:', err.message));

module.exports = pool;
