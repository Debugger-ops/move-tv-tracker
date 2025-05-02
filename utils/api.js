const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchTrending = async (mediaType = 'all', timeWindow = 'day') => {
  const response = await fetch(
    `${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`
  );
  return await response.json();
};

export const fetchMediaDetails = async (mediaType, id) => {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`
  );
  return await response.json();
};

export const searchMedia = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  return await response.json();
};
