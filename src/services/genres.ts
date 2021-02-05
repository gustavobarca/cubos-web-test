import { GenreResponse } from 'types';
import api from './api';

async function getFromMovies() {
  const { data } = await api.get<GenreResponse>('/genre/movie/list');

  return data.genres;
}

export default { getFromMovies };
