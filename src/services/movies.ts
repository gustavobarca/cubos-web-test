import { PagedResponse, Movie } from 'types';
import queryString from 'query-string';
import api from './api';
import genresService from './genres';

async function addGenresToMovies(movies: Movie[]) {
  const allGenres = await genresService.getFromMovies();

  return movies.map(movie => {
    movie.genres = [];

    movie.genre_ids.forEach(genreTofind => {
      const finded = allGenres.find(genre => genre.id === genreTofind);
      if (finded) movie.genres.push(finded);
    });

    return movie;
  });
}

async function getPopular(page = 1) {
  const { data } = await api.get<PagedResponse<Movie>>(`/movie/popular?page=${page}`);

  data.results = await addGenresToMovies(data.results);
  return data;
}

async function search(page = 1, query: string) {
  const params = { query, page };

  const { data } = await api.get<PagedResponse<Movie>>(`/search/movie?${queryString.stringify(params)}`);
  data.results = await addGenresToMovies(data.results);

  return data;
}

export default { getPopular, search };
