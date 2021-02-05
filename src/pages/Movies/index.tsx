import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import moviesService from 'services/movies';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import MovieCard from 'components/MovieCard';
import { Movie } from 'types';
import Pagination from 'components/Pagination';
import useDebounce from 'hooks/useDebouce';
import api from 'services/api';
import { Console } from 'console';
import { resourceLimits } from 'worker_threads';
import { Main, SubContainer, ErrorText } from './styles';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagedResults, setPagedResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { colors } = useTheme();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  function group(movies: Movie[]) {
    let temp: Movie[] = [];
    const returnValue: Movie[][] = [];

    movies.forEach(movie => {
      temp.push(movie);

      if (temp.length === 5) {
        returnValue.push(temp);
        temp = [];
      }
    });

    return returnValue;
  }

  async function search(pageNumber = 1, query: string) {
    try {
      if (!loading) setLoading(true);
      const { total_pages, results } = await moviesService.search(pageNumber, query);
      setTotal(total_pages);
      setMovies(results);
      setLoading(false);
    } catch (err) {
      setError('😕 Oops! Ocorreu um erro');
    }
  }

  const [grouped, setGrouped] = useState<Movie[][]>([]);
  const [innerPage, setInnerPage] = useState(1);

  function clamp(val: number) {
    return val < 0 ? 0 : val;
  }

  function getPage2(innerPage: number, groupedResults: Movie[][]) {
    const index = clamp(innerPage - 1);
    return groupedResults[index];
  }

  async function fetchNewPages(pageNumber = 1, innerPage = 1) {
    try {
      console.log('pageNumber', pageNumber, 'innerPage', innerPage);

      const { results, total_results } = await moviesService.getPopular(pageNumber);
      const grouped = group(results);

      console.log('CHAMOOOO', grouped);

      setGrouped(grouped);
      setMovies(results);
      const page = getPage2(innerPage, grouped);

      const total = Math.ceil(total_results / 5);

      setTotal(total);

      setLoading(false);
      setPagedResults(page);
    } catch (err) {
      setError('😕 Oops! Ocorreu um erro');
    }
  }

  function handlePageChange(pageNum: number) {
    const limit = 4;

    const taIndoPraFrente = pageNum > page;
    const parado = pageNum === page;
    const taIndoPraTras = pageNum < page;

    if (parado) return;

    setPage(pageNum);

    const blocksPassed = apiPage - 1 < 0 ? 0 : apiPage - 1;
    const innerPageIndexDestiny = pageNum - blocksPassed * limit;
    const vaiIrPraFrente = innerPageIndexDestiny > limit;
    const vairIrPratras = innerPageIndexDestiny <= 0;

    // PA FRENTE
    if (vaiIrPraFrente) {
      setApiPage(prev => {
        const nextAPIPAGE = prev + 1;

        const newBlocksPassed = nextAPIPAGE - 1 < 0 ? 0 : nextAPIPAGE - 1;
        const aa = pageNum - newBlocksPassed * limit;

        fetchNewPages(nextAPIPAGE, aa);
        setInnerPage(aa);

        return nextAPIPAGE;
      });
    } else if (vairIrPratras) {
      setApiPage(prev => {
        const nextAPIPAGE = prev - 1;

        const newBlocksPassed = nextAPIPAGE - 1 < 0 ? 0 : nextAPIPAGE - 1;
        const aa = pageNum - newBlocksPassed * limit;

        fetchNewPages(nextAPIPAGE, aa);
        setInnerPage(aa);

        return nextAPIPAGE;
      });
    } else if (taIndoPraFrente) {
      const newBlocksPassed = apiPage - 1 < 0 ? 0 : apiPage - 1;
      const aa = pageNum - newBlocksPassed * limit;

      setPagedResults(getPage2(aa, grouped));
      setInnerPage(aa);
    } else if (taIndoPraTras) {
      const newBlocksPassed = apiPage - 1 < 0 ? 0 : apiPage - 1;
      const aa = pageNum - newBlocksPassed * limit;

      setPagedResults(getPage2(aa, grouped));
      setInnerPage(aa);
    }
  }

  // console.log('apiPage STATE', apiPage);
  // console.log('innerPageIndexActual', innerPageIndexActual);

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function renderContent() {
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

    if (!movies.length) {
      return (
        <SubContainer>
          <ErrorText>🎥 Não achamos nenhum filme!</ErrorText>
        </SubContainer>
      );
    }

    return (
      <>
        {pagedResults.map(movie => (
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
          actualPage={page}
          totalPages={total}
          onChange={handlePageChange}
        />
      </>
    );
  }

  useEffect(() => {
    fetchNewPages();
  }, []);

  // useEffect(() => {
  //   if (page) {

  //   }
  // }, [page]);

  useEffect(() => {
    const resetedPage = 1;
    setPage(resetedPage);

    if (debouncedSearchTerm) {
      search(resetedPage, debouncedSearchTerm);
    } else {
      // fetchPopular(resetedPage);
    }
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
