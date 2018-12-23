require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  port: process.env.DBPORT,
})

pool.query('SELECT * FROM posts ORDER BY date DESC LIMIT 5')
  .then((result) => {
    console.log("This result is based on the date (4th column).")
    console.log(result.rows);
  })
  .catch((err) => {
    console.error(err);
  })

pool.query('SELECT * FROM posts LIMIT 5')
  .then((result) => {
    console.log("This result is based on the last 5 entries (no ORDER BY).")
    console.log(result.rows);
  })
  .catch((err) => {
    console.error(err);
  })

pool.end();