const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

const allRoutes = require('./routes');

app.use(express.static('./public'));
app.use(express.json());
app.use('/api', allRoutes);

app.listen(PORT, () => {
	console.log(`App listening on ${PORT} `);
});
