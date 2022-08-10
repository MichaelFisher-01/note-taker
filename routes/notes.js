//Accessed Via /notes
const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const { title } = require('process');

const router = Router();

router.get('/', (req, res) => {
	fs.readFile('./db/db.json', 'utf-8', (err, data) => {
		if (err) {
			console.log(err);
			res.status(400).send('There was an error with /note get');
		} else {
			console.log(JSON.parse(data));
			res.json(JSON.parse(data));
		}
	});
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
			currentData.forEach((note, position) => {
				note.id = position;
			});
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

router.delete('/:id', (req, res) => {
	fs.readFile('./db/db.json', 'utf-8', (err, data) => {
		if (err) {
			console.log(err);
			res.status(400).send('There was an error with /notes delete');
		} else {
			const currentList = JSON.parse(data);
			const newList = currentList.filter((note) => {
				return note.id != req.params.id;
			});
			console.log(newList);
			fs.writeFile('./db/db.json', JSON.stringify(newList), 'utf-8', (err) => {
				if (err) {
					console.log(err);
					res
						.status(400)
						.send('There was an error with the /note writting delete list.');
				} else {
					res.send('Deletion Successful!');
				}
			});
		}
	});
});

module.exports = router;
