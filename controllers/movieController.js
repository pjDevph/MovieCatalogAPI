const Movie = require('../models/Movie');

const addMovie = async (req, res) => {
  try {
    const { title, director, year, description, genre } = req.body;

    const movie = new Movie({ title, director, year, description, genre, comments: [] });
    const savedMovie = await movie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const updateData = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const deleted = await Movie.findByIdAndDelete(movieId);
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });

    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const { userId, commentText } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    movie.comments.push({ userId, comment: commentText });
    await movie.save();

    res.json({
      message: 'comment added successfully',
      updatedMovie: movie
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.json({ comments: movie.comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  addComment,
  getComments
};
