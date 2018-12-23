require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const PORT = 5000;
const app = express();
const pool = new Pool({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  port: process.env.DBPORT,
})

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.render('url_home');
})

app.get('/posts', (request, response) => {
  pool.query('SELECT * FROM posts ORDER BY date DESC')
    .then((res) => {
      let data = res.rows;
      console.log(res.rows);
      response.render('url_posts', { data });
    })
    .catch((err) => {
      console.error(err);
    })
})

app.get('/posts/submit', (request, response) => {
  response.render('url_submit');
})

app.post('/posts/submit', (request, response) => {
  const input = request.body;
  const date = new Date;

  pool.query('INSERT INTO posts (title, description, email) VALUES ($1, $2, $3, $4)', 
    [input.email, input.title, input.description, date.toDateString()])
    .then((result) => {;
      response.redirect('url_posts');
    })
    .catch((err) => {
      console.error(err);
    })
})

app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`)
})