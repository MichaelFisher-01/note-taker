const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('./develop/public'));

app.get;

app.listen(PORT, () => {
	console.log(`App listening on ${PORT} `);
});
