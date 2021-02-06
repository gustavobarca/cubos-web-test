import Header from 'components/Header';
import MovieDetailSection from 'components/MovieDetailSection';
import { Message, SubContainer } from 'components/PageDefaults';
import Video from 'components/Video';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import moviesService from 'services/movies';
import { useTheme } from 'styled-components';
import { Movie } from 'types';
import Main from './styles';

export default function MovieDetails() {
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id }: { id?: string | number } = useParams();
  const { colors } = useTheme();

  async function fetch() {
    try {
      const data = await moviesService.get(parseInt(String(id), 10));
      setMovie(data);
      setLoading(false);
    } catch (error) {
      setError('😕 Oops! Ocorreu um erro.');
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  function render() {
    if (error) {
      return (
        <SubContainer>
          <Message>{error}</Message>
        </SubContainer>
      );
    }

    if (loading) {
      return (
        <SubContainer>
          <PulseLoader
            color={colors.primary}
            loading
            size={20}
          />
        </SubContainer>
      );
    }

    if (!movie) {
      return (
        <SubContainer>
          <Message>😮 &nbsp;Oops! Este filme não foi encontrado.</Message>
        </SubContainer>
      );
    }

    return (
      <>
        <MovieDetailSection
          title={movie.title}
          status={movie.status}
          releaseDate={movie.release_date}
          runtime={movie.runtime}
          backdropPath={movie.backdrop_path}
          budget={movie.budget}
          revenue={movie.revenue}
          genres={movie.genres}
          posterPath={movie.poster_path}
          overview={movie.overview}
          originalLanguage={movie.original_language}
        />
        {movie.videoObject && (
          <Video urlKey={movie.videoObject.key} site={movie.videoObject.site} />
        )}
      </>
    );
  }

  return (
    <Main>
      <Header title="Movies" />
      {render()}
    </Main>
  );
}
