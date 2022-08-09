const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const allRoutes = require('./routes');

app.use(express.static('./public'));
app.use(express.json());
app.use('/', allRoutes);

/*app.get('/', (req, res) => {
	res.sendFile('./public/index');
});

app.get('/notes', (req, res) => {
	res.sendFile('./public/notes');
});*/

app.listen(PORT, () => {
	console.log(`App listening on ${PORT} `);
});
