//Accessed Via /notes

const { Router, application } = require('express');

const router = Router();

router.get('/', (req, res) => {
	res.send('Notes Page will display here');
});

router.post('/', (req, res) => {
	console.log(req.body);
	res.send('Posted Notes will display here');
});

module.exports = router;
