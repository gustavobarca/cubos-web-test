import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import moviesService from 'services/movies';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import MovieCard from 'components/MovieCard';
import { Genre, Movie, PagedResponse } from 'types';
import Pagination from 'components/Pagination';
import useDebounce from 'hooks/useDebouce';
import usePagination from 'hooks/usePagination';
import { useHistory } from 'react-router-dom';
import { Message, SubContainer } from 'components/PageDefaults';
import genresService from 'services/genres';
import GenreFilter from 'components/GenreFilter';
import Main from './styles';

const all = { id: 0, name: 'Todos' };

export default function Movies() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genresLoading, setGenresLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<Genre>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { colors } = useTheme();
  const history = useHistory();
  const debounce = useDebounce(searchTerm, 500);

  async function onRequestUpdate(pageNumber = 1) {
    try {
      let result: PagedResponse<Movie> = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      };

      if (debounce.value && searchTerm) {
        result = await moviesService.search(pageNumber, debounce.value);
      } else if (selectedGenre && selectedGenre.id) {
        result = await moviesService.getByGenre(pageNumber, selectedGenre.id);
      } else {
        result = await moviesService.getPopular(pageNumber);
      }

      setTotal(Math.ceil(result.total_results / 5));
      setLoading(false);

      return result.results;
    } catch (err) {
      setError('😕 Oops! Ocorreu um erro.');
      return [];
    }
  }

  const pagination = usePagination<Movie>(onRequestUpdate);

  async function fetchGenres() {
    try {
      const allGenres = await genresService.getFromMovies();
      setGenres([all, ...allGenres]);
      setSelectedGenre(all);
      setGenresLoading(false);
    } catch (err) {
      setError('Oops! Ocorreu um erro.');
    }
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function clearSearch() {
    const input = document.getElementById('search') as HTMLInputElement;
    input.value = '';
    debounce.reset();
  }

  function handleSelectGenre(genre: Genre) {
    clearSearch();
    setSelectedGenre(genre);
  }

  function renderContent() {
    const { results, activePage } = pagination;

    if (error) {
      return (
        <SubContainer>
          <Message>
            <span role="img" aria-label="Sad Face">😕</span>
            {' '}
            {error}
          </Message>
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

    if (!results.length) {
      return (
        <SubContainer>
          <Message>
            <span role="img" aria-label="cine Camera">🎥</span>
            {' '}
            &nbsp;Não achamos nenhum filme!
          </Message>
        </SubContainer>
      );
    }

    return (
      <>
        {results.map(movie => (
          <MovieCard
            onClick={() => history.push(`/movies/${movie.id}`)}
            title={movie.title}
            genres={movie.genres}
            overview={movie.overview}
            points={movie.vote_average}
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
            releaseDate={movie.release_date}
            key={movie.id}
          />
        ))}
        <Pagination
          actualPage={activePage}
          totalPages={total}
          onChange={pagination.onSelectPage}
        />
      </>
    );
  }

  function fetchResults() {
    if (!loading) setLoading(true);
    pagination.reset();
    pagination.fetch();
  }

  useEffect(() => {
    if (selectedGenre && selectedGenre.name === 'Todos') {
      fetchResults();
      return;
    }

    if (selectedGenre) fetchResults();
  }, [selectedGenre]);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (debounce.value !== undefined) {
      setSelectedGenre(undefined);
      fetchResults();
    }
  }, [debounce.value]);

  return (
    <Main>
      <Header title="Movies" />
      <section className="page-content">
        <SearchBar
          disabled={loading}
          onChange={handleSearchChange}
          placeholder="Busque um filme pelo nome..."
        />
        <GenreFilter
          genres={genres}
          onChange={handleSelectGenre}
          loading={genresLoading}
          selectedGenre={selectedGenre}
        />
        <section id="movies-content">
          {renderContent()}
        </section>
      </section>
    </Main>
  );
}
