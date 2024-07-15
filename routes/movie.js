const express = require('express');

const movieController = require('../controllers/movie');

const { verify, verifyAdmin } = require('../auth');

const router = express.Router();


// add movie
router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);

// delete movie
router.delete('/deleteMovie/:movieId', verify, verifyAdmin, movieController.deleteMovie);

// update movie
router.patch('/updateMovie/:movieId', verify, verifyAdmin, movieController.updateMovie);
// end of admin accessed routes for movies

// add comments
router.patch('/addComment/:movieId', verify, movieController.addComment);

// get comments
router.get('/getComments/:movieId', verify, movieController.getComments);

//get movie by ID
router.get('/getMovie/:movieId', verify, movieController.getMovie);

// get movies
router.get('/getMovies', verify, movieController.getMovies);




module.exports = router;