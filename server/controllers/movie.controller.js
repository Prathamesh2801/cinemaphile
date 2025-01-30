import axios from 'axios';

export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    console.log('Received search query:', query); // Debug log

    if (!query) {
      console.log('Empty query received, returning empty results');
      return res.json({ Search: [] });
    }

    console.log('Making OMDB API request with query:', query);
    const response = await axios.get(`${process.env.OMDB_BASE_URL}`, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: query,
       // type: 'movie' // Optional: restrict to movies only
      }
    });

    console.log('OMDB API response received:', {
      status: response.status,
      hasError: !!response.data.Error,
      resultCount: response.data.Search?.length
    });

    // Handle OMDB API errors
    if (response.data.Error) {
      console.log('OMDB API returned error:', response.data.Error);
      return res.status(400).json({ message: response.data.Error });
    }
    
    res.json(response.data);
  } catch (error) {
    console.error('Search error:', {
      message: error.message,
      code: error.code,
      response: error.response?.data
    });
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
