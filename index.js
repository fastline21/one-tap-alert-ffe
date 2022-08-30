require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const db = require("./config/db");
db();

const app = express();

app.use(cors());

app.use(express.json({ extended: true }));

app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);

app.use("/api", require("./routes"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
