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
app.use('/public', express.static('public'));

app.get('/', (request, response) => {
  response.render('url_home');
})

// 'CREATE DATABASE <name>'
// 'CREATE TABLE posts(title VARCHAR(255), description VARCHAR, email VARCHAR, date VARCHAR)'

app.get('/posts', (request, response) => {
  pool.query('SELECT * FROM posts ORDER BY date DESC')
    .then((res) => {
      let data = res.rows;
      response.render('url_posts', { data });
    })
    .catch((err) => {
      console.error(err);
    })
})

app.get('/posts/submit', (request, response) => {
  response.render('url_submit');
})

// input to post (pg)
app.post('/posts/submit', (request, response) => {
  const input = request.body;

  // TODO: apply proper error handling for UI
  if (input.title.length > 255) {
    console.log('Title cannot be longer than 255 characters.')
    return;
  }
  if (!input.title) {
    console.log('Title cannot be empty.')
    return;
  }
  if (input.description.length <= 1000 && input.description.length < 3) {
    console.log('Content must be between 3 to 1000 characters!')
    return;
  } else {
    const date = (new Date).toDateString();
    pool.query('INSERT INTO posts(title, description, email, date) VALUES ($1, $2, $3, $4);', 
      [input.email, input.title, input.description, date])
      .then((result) => {;
        response.redirect('/posts');
      })
      .catch((err) => {
        console.error(err);
      })
  }
})

app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`)
})