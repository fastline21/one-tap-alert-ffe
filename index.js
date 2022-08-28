require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

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

app.get('/', (req, res) => {
	res.send('Welcome to One-Tap Alert FFE');
});

// app.use('/api', require('./routes'));

const port = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || 'localhost';

app.listen(port, () => console.log(`Server running on ${port}`));
