# Colinkz - Technical Challenge (Dec 23, 2018)

Website: <https://www.colinkz.com/>

# Getting started:

Install the dependencies.

Create a .env file with the following information:
  - DBNAME="database name"
  - DBUSER="postgres user"
  - DBPASSWORD="postgres password"
  - DBPORT="postgres port (usually 5432)"

Run the following queries in postgreSQL:
  - 'CREATE DATABASE "database name"
  - 'CREATE TABLE posts(title VARCHAR(255), description VARCHAR, email VARCHAR, date VARCHAR)'

Run `npm start` and go to:
  - http://localhost:5000
  - Website should be up and running.

# Getting the last 5 post submissions without web.

Run `node blogscript.js`

# Dependencies
  - "body-parser": "^1.18.3",
  - "dotenv": "^6.2.0",
  - "express": "^4.16.4",
  - "pg": "^7.7.1"

