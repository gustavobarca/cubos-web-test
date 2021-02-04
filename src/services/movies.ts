import { PagedResponse, Movie } from 'types';
import api from './api';

async function getPopular() {
  const { data } = await api.get<PagedResponse<Movie>>('/movie/popular?append_to_response=genres');

  return data;
}

export default { getPopular };
