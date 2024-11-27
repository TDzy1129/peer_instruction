const express = require('express');
const router = express.Router();
const {selectRecord, insertRecord, selectSingleRecord} = require('../controllers/answerController');

router.post('/select',selectRecord);

router.post('/insert', insertRecord);

router.post('/selectSingle', selectSingleRecord);



module.exports = router;