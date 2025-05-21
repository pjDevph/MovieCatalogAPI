const express = require('express');
const router = express.Router();

const {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  addComment,
  getComments
} = require('../controllers/movieController');

const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Admin-only routes
router.post('/addMovie', verifyToken, isAdmin, addMovie);
router.patch('/updateMovie/:movieId', verifyToken, isAdmin, updateMovie);
router.delete('/deleteMovie/:movieId', verifyToken, isAdmin, deleteMovie);

// Public routes
router.get('/getMovies', getMovies);
router.get('/getMovie/:movieId', getMovieById);

// Authenticated users comment routes
router.post('/:movieId/comments/addComment', verifyToken, addComment);
router.get('/:movieId/comments/getComments', getComments);

module.exports = router;
