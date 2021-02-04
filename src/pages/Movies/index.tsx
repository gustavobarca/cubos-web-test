import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import moviesService from 'services/movies';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import MovieCard from 'components/MovieCard';
import { Movie } from 'types';
import { Page } from './styles';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { colors } = useTheme();

  async function fetchPopular() {
    try {
      const data = await moviesService.getPopular();
      setMovies(data.results);
      setLoading(false);
    } catch ({ message }) {
      setError(message);
    }
  }

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <Page>
      <Header title="Movies" />
      <main>
        <SearchBar placeholder="Busque um filme por nome ou gênero..." />
        <PulseLoader color={colors.primary} loading={loading} size={20} />
        {movies.map(movie => (
          <MovieCard
            title={movie.title}
            genres={['Ação', 'LALALA', 'dasdas', 'asddasdas', 'dadsadsa']}
            overview={movie.overview}
            points={movie.vote_average}
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
            releaseDate={movie.release_date}
            key={movie.id}
          />
        ))}
      </main>
    </Page>
  );
}
