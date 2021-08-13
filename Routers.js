const express = require('express');
const router = express.Router();


const CANDIDATE_DETAILS = require('./Controller/Candidate');
const SAVED_TEST_SCORE  = require('./Controller/SaveTestScore');
const GET_MAX_SCORE_CANDIDATE = require('./Controller/getMaxScore');


router.post('/candidate', CANDIDATE_DETAILS.Candidate);
router.post('/testscore', SAVED_TEST_SCORE.SaveTestScore);
router.get('/maxscore', GET_MAX_SCORE_CANDIDATE.getMaxScore);


module.exports = router;
