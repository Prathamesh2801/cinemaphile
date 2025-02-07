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
        i: id,
        plot: 'full'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Movie details error:', error.message);
    res.status(500).json({ message: 'Error fetching movie details' });
  }
};

export const getTopMovies = async (req, res) => {
  try {
    // List of IMDb IDs for top-rated movies
    const topMovieIds = [
      'tt0111161', // The Shawshank Redemption
      'tt0068646', // The Godfather
      'tt0071562', // The Godfather: Part II
      'tt0468569', // The Dark Knight
      'tt0050083', // 12 Angry Men
      'tt0108052', // Schindler's List
      'tt0167260', // The Lord of the Rings: The Return of the King
      'tt0110912', // Pulp Fiction
      'tt0060196', // The Good, the Bad and the Ugly
      'tt0120737', // The Lord of the Rings: The Fellowship of the Ring
      'tt0109830', // Forrest Gump
      'tt0137523', // Fight Club
      'tt0080684', // Star Wars: Episode V - The Empire Strikes Back
      'tt0167261', // The Lord of the Rings: The Two Towers
      'tt0133093', // The Matrix
      'tt0099685', // Goodfellas
      'tt0073486', // One Flew Over the Cuckoo's Nest
      'tt0047478', // Seven Samurai
      'tt0114369', // Se7en
      'tt0317248', // City of God
    ];

    const moviePromises = topMovieIds.map(id =>
      axios.get(`${process.env.OMDB_BASE_URL}`, {
        params: {
          apikey: process.env.OMDB_API_KEY,
          i: id,
        }
      })
    );

    const responses = await Promise.all(moviePromises);
    const movies = responses.map(response => response.data);

    res.json(movies);
  } catch (error) {
    console.error('Error fetching top movies:', error);
    res.status(500).json({ message: 'Error fetching top movies' });
  }
};
