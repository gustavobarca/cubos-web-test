import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import moviesService from 'services/movies';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import MovieCard from 'components/MovieCard';
import { Movie, PagedResponse } from 'types';
import Pagination from 'components/Pagination';
import useDebounce from 'hooks/useDebouce';
import usePagination from 'hooks/usePagination';
import { Main, SubContainer, ErrorText } from './styles';

export default function Movies() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { colors } = useTheme();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  async function onRequestUpdate(pageNumber = 1) {
    try {
      let result: PagedResponse<Movie> = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      };

      if (debouncedSearchTerm) {
        result = await moviesService.search(pageNumber, debouncedSearchTerm);
      } else {
        result = await moviesService.getPopular(pageNumber);
      }

      setTotal(Math.ceil(result.total_results / 5));
      setLoading(false);

      return result.results;
    } catch (err) {
      setError('😕 Oops! Ocorreu um erro');
      return [];
    }
  }

  const pagination = usePagination<Movie>(onRequestUpdate);

  function handlePageChange(selectedPage: number) {
    pagination.onSelectPage(selectedPage);
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function renderContent() {
    const { results, activePage } = pagination;

    if (error) {
      return (
        <SubContainer>
          <ErrorText>{error}</ErrorText>
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
          <ErrorText>🎥 Não achamos nenhum filme!</ErrorText>
        </SubContainer>
      );
    }

    return (
      <>
        {results.map(movie => (
          <MovieCard
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
          onChange={handlePageChange}
        />
      </>
    );
  }

  useEffect(() => {
    pagination.reset();
    pagination.fetch();
  }, [debouncedSearchTerm]);

  return (
    <Main>
      <Header title="Movies" />
      <section className="page-content">
        <SearchBar onChange={handleSearchChange} placeholder="Busque um filme por nome ou gênero..." />
        <section id="movies-content">
          {renderContent()}
        </section>
      </section>
    </Main>
  );
}
