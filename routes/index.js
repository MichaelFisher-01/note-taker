const { Router } = require('express');
const router = Router();

const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;
