import PointsBadge from 'components/PointsBadge';
import React from 'react';
import { Genre } from 'types';
import XDate from 'xdate';
import configs from 'config/api.json';
import defaultImg from 'assets/images/default_movie.png';
import GenreTag from 'components/GenreTag';
import translatedLanguages from 'config/languages.json';
import translatedStatus from 'config/status.json';
import { Info, Poster, Container } from './styles';

interface Props {
  title: string;
  releaseDate: string;
  overview: string;
  status: string;
  runtime: number;
  budget: number;
  revenue: number;
  genres: Genre[];
  posterPath: string;
  backdropPath: string;
  originalLanguage: string
}

export default function MovieDetailSection({
  title,
  releaseDate,
  overview,
  status,
  runtime,
  budget,
  revenue,
  genres,
  posterPath,
  backdropPath,
  originalLanguage,
}: Props) {
  function getImage() {
    const poster = posterPath ? `${configs.imagesURL}/w500/${posterPath}` : defaultImg;
    const backdrop = backdropPath ? `${configs.imagesURL}/w500/${backdropPath}` : defaultImg;
    return { poster, backdrop };
  }

  function getDuration() {
    const inHours = runtime / 60;
    const decimalPart = inHours % 1;
    const hour = Math.trunc(inHours);
    const minutes = Math.round(decimalPart * 60) - 1;

    return `${hour}h ${minutes}min`;
  }

  function formatMoney(value: number) {
    return `$${value.toLocaleString()},00`;
  }

  function getProfit() {
    const subtract = revenue - budget;
    return formatMoney(subtract);
  }

  return (
    <Container>
      <div id="movie-dt-header">
        <h1>{title}</h1>
        <h3>{releaseDate && new XDate(releaseDate).toString('dd/MM/yyyy')}</h3>
      </div>
      <div id="movie-dt-inside">
        <div id="movie-dt-content">
          <h3>Sinopse</h3>
          <hr />
          <p>{overview}</p>
          <h3>Informações</h3>
          <hr />
          <div id="movie-dt-infos">
            <Info>
              <h4>Situação</h4>
              <h5>{translatedStatus[status]}</h5>
            </Info>
            <Info>
              <h4>Idioma</h4>
              <h5>{translatedLanguages[originalLanguage]}</h5>
            </Info>
            <Info>
              <h4>Duração</h4>
              <h5>{getDuration()}</h5>
            </Info>
            <Info>
              <h4>Orçamento</h4>
              <h5>{formatMoney(budget)}</h5>
            </Info>
            <Info>
              <h4>Receita</h4>
              <h5>{formatMoney(revenue)}</h5>
            </Info>
            <Info>
              <h4>Lucro</h4>
              <h5>{getProfit()}</h5>
            </Info>
          </div>
          <div id="movie-dt-footer">
            <div id="genres-container">
              {genres.map(({ id, name }) => <GenreTag key={id} title={name} />)}
            </div>
            <PointsBadge size={100} percentage={75} />
          </div>
        </div>
        <Poster
          backdrop={getImage().backdrop}
          poster={getImage().poster}
        />
      </div>
    </Container>
  );
}
