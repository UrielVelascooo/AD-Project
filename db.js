const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE || 'adidas_db',
  user: process.env.PGUSER || 'admin',
  // If PGPASSWORD is not set, leave password undefined so the client
  // doesn't attempt to authenticate with an empty string.
  password: process.env.PGPASSWORD !== undefined && process.env.PGPASSWORD !== ''
    ? process.env.PGPASSWORD
    : undefined
});

module.exports = pool;
