require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_STRING)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
