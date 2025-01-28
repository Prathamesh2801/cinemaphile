import axios from 'axios';

export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`${process.env.OMDB_BASE_URL}`, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: query
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ message: 'Error searching movies' });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${process.env.OMDB_BASE_URL}`, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: id
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Movie details error:', error.message);
    res.status(500).json({ message: 'Error fetching movie details' });
  }
};
