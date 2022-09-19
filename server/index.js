require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('cookie-session');
const path = require('path');

const db = require('./config/db');
db();

const app = express();

app.use(cors());

app.use(express.json({ extended: true }));

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/api', require('./routes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const clientDir = path.resolve('client', 'build');
  // Set static folder
  app.use(express.static(clientDir));

  app.get('*', (req, res) => res.sendFile(path.join(clientDir, 'index.html')));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port:${port}`));
