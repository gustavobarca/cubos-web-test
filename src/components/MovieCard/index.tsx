import React from 'react';
import configs from 'config/api.json';
import PointsBadge from 'components/PointsBadge';
import XDate from 'xdate';
import GenreTag from 'components/GenreTag';
import { Genre } from 'types';
import defaultImg from 'assets/images/default_movie.png';
import { Container, RightCol, Poster } from './styles';

interface Props {
  title: string;
  points: number;
  releaseDate: string;
  posterPath: string;
  overview: string;
  genres: Genre[];
  backdropPath: string;
  onClick: () => void;
}

export default function MovieCard({
  title,
  points,
  releaseDate,
  posterPath,
  overview,
  genres,
  backdropPath,
  onClick,
}: Props) {
  const poster = posterPath ? `${configs.imagesURL}/w300/${posterPath}` : defaultImg;
  const backdrop = backdropPath ? `${configs.imagesURL}/w300/${backdropPath}` : defaultImg;

  return (
    <Container onClick={onClick}>
      <Poster
        id="poster"
        poster={poster}
        backdrop={backdrop}
      />
      <RightCol>
        <div>
          <div id="strip" />
          <div id="movie-header">
            <PointsBadge percentage={points * 10} />
            <div id="movie-text-container">
              <h1>{title}</h1>
              {releaseDate && <h3>{new XDate(releaseDate).toString('dd/MM/yyyy')}</h3>}
            </div>
          </div>
        </div>
        <div id="movie-content">
          <p>{overview}</p>
          {genres.map(genre => <GenreTag key={genre.id} title={genre.name} />)}
        </div>
      </RightCol>
    </Container>
  );
}
