import api from './api';

async function getFromMovies() {
  const { data } = await api.get('/genre/movie/list');

  return data;
}

export default { getFromMovies };
