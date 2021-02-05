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

  function getPage(apiPage: number, page: number, data: Movie[], whenFecthNext: (page: number) => void) {
    const getGroupedData = group(data);

    const pageIndex = page - 1;
    const pageResults = getGroupedData[pageIndex];
    const willFetchNext = page > getGroupedData.length;

    if (willFetchNext) {
      whenFecthNext(apiPage + 1);
      return [];
    }

    return pageResults;
  }

  // let page = 1;
  // let innerPage = 6;

  // movies = getPage(page, innerPage, a, pg => {
  //   page = pg;
  //   innerPage = 1;
  // });

  async function fetchPopular(pageNumber = 1, innerPage = 1, fetchNext: (n: number) => void) {
    try {
      console.log('pageNumber', pageNumber, 'innerPage', 1);

      if (!loading) setLoading(true);
      const { total_results, results } = await moviesService.getPopular(pageNumber);
      const paged = getPage(pageNumber, innerPage, results, fetchNext);

      const total = Math.ceil(total_results / 5);

      setTotal(total);

      setMovies(results);
      setPagedResults(paged);

      setLoading(false);
    } catch (err) {
      setError('😕 Oops! Ocorreu um erro');
    }
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

  // function handlePageChange(innerPage: number) {
  //   setPage(innerPage);

  //   if (searchTerm) {
  //     search(innerPage, searchTerm);
  //   } else {
  //     console.log('apiPage', apiPage, 'innerPage', innerPage);

  //     if (innerPage > apiPage * 5) {

  //     }

  //     // const pagefinded = getPage(apiPage, innerPage, movies, pagenum => {
  //     //   console.log('mudoooooooooooooo');
  //     //   // setApiPage(pagenum);
  //     //   // setPage(1);
  //     // });

  //     // setPagedResults(pagefinded);
  //   }
  // }

  function getPage2(innerPage: number, data: Movie[]) {
    const grouped = group(data);

    const pageIndex = innerPage - 1;

    return grouped[pageIndex];
  }

  const [innerPageIndexActual, setInnerPageIndexActual] = useState(0);

  function handlePageChange(pageNum: number) {
    const taIndoPraFrente = pageNum > page;
    const parado = pageNum === page;
    const taIndoPraTras = pageNum < page;

    if (parado) return;

    setPage(pageNum);

    const blocksPassed = apiPage - 1 < 0 ? 0 : apiPage - 1;
    const innerPageIndexDestiny = pageNum - blocksPassed * 5;
    const vaiIrPraFrente = innerPageIndexDestiny > 5;
    const vairIrPratras = innerPageIndexDestiny <= 0;

    // PA FRENTE
    if (vaiIrPraFrente) {
      console.log('FOI PRA FRENTEEEEEE');

      setApiPage(prev => {
        // Descobrir nova posição;
        const nextAPIPAGE = prev + 1;

        const newBlocksPassed = nextAPIPAGE - 1 < 0 ? 0 : nextAPIPAGE - 1;
        const aa = pageNum - newBlocksPassed * 5;

        console.log('novo index', aa, 'page', nextAPIPAGE);
        setInnerPageIndexActual(aa);

        return nextAPIPAGE;
      });
    } else if (vairIrPratras) {
      console.log('vai pa trassssssssss');
      setApiPage(prev => {
        // Descobrir nova posição;
        const nextAPIPAGE = prev - 1;

        const newBlocksPassed = nextAPIPAGE - 1 < 0 ? 0 : nextAPIPAGE - 1;
        const aa = pageNum - newBlocksPassed * 5;

        console.log('novo index', aa, 'page', nextAPIPAGE);
        setInnerPageIndexActual(aa);

        return nextAPIPAGE;
      });
    } else if (taIndoPraFrente) {
      setInnerPageIndexActual(prev => {
        console.log('PRA FRENTE =>', prev + 1);
        return prev + 1;
      });
    } else if (taIndoPraTras) {
      setInnerPageIndexActual(prev => {
        console.log('PRA TRAS', prev - 1);
        return prev - 1;
      });
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
    fetchPopular(1, 1, () => {});
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
