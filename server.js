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
  response.render('url_posts');
})

app.get('/posts/submit', (request, response) => {
  response.render('url_submit');
})

app.post('/posts/submit', (request, response) => {
  console.log(request.body);
})

app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`)
})