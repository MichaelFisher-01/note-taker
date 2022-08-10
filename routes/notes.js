//Accessed Via /notes
const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const { title } = require('process');

const router = Router();

//Get route that is accessed from public/assests/js/index.
router.get('/', (req, res) => {
	//Readfile to obtain the information form db/db.json When this is returned the index.js can generate a note list for the user.
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

//Post route that sends data from public/assets/js/index.
router.post('/', (req, res) => {
	//The datat from index.js will contain title of note and text.
	const { title, text } = req.body;
	//We grab all the current notes that have been generated in the past from the db/db.json
	fs.readFile('./db/db.json', 'utf8', (err, data) => {
		if (err) {
			console.log(err);
			res.status(400).send('Error with /notes post');
		} else {
			// Turn the datat from db.json into a JSON that we can manipulate
			const currentData = JSON.parse(data);
			//Add the newly sent over Text and Title to the JSON
			currentData.push({ title, text });
			//Run through the entire JSON and ensure all have an ID that can be  grabbed by the delete route.
			currentData.forEach((note, position) => {
				note.id = position;
			});
			//Updated db.json with all the changes we made after recieving the new note information from index.js
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

//Delete used to clear out notes after the trash can button is pressed.
router.delete('/:id', (req, res) => {
	//First we will grab the current notes that have been created from db/db.json
	fs.readFile('./db/db.json', 'utf-8', (err, data) => {
		if (err) {
			console.log(err);
			res.status(400).send('There was an error with /notes delete');
		} else {
			//We will need a new list that does not contain the note that index.js request to be deleted.
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
