//Accessed Via /notes
const { Router, application } = require('express');
const path = require('path');
const fs = require('fs');

const router = Router();

router.get('/', (req, res) => {
	res.send('This is where the notes page will display');
});

router.post('/', (req, res) => {
	const { title, text } = req.body;
	fs.readFile('./db/db.json', 'utf8', (err, data) => {
		if (err) {
			console.log(err);
			res.status(400).send('Error with /notes post');
		} else {
			const currentData = JSON.parse(data);
			currentData.push({ title, text });
			fs.writeFile(
				'./db/db.json',
				JSON.stringify(currentData),
				'utf-8',
				(err) => {
					if (err) {
						console.log(err);
						res.status(400).send('There was an error with the /note write.');
					}
				}
			);
		}
	});
	res.send('Notes succesfully updated');
});

module.exports = router;
