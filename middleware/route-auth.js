module.exports = (req, res, next) => {
	const apiKey = req.header('x-api-key');
	const API_KEY = process.env.API_KEY;

	if (!apiKey) {
		return res.status(401).json({ error: 'No key, authorization denied' });
	}

	if (apiKey !== API_KEY) {
		res.status(401).json({ error: 'Key is not valid' });
	}

	next();
};
