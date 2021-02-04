import React from 'react';
import configs from 'config/api.json';
import PointsBadge from 'components/PointsBadge';
import XDate from 'xdate';
import GenreTag from 'components/GenreTag';
import {
  Container,
  RightCol,
  Header,
  TextsContainer,
  Strip,
  Content,
  Poster,
} from './styles';

interface Props {
  title: string;
  points: number;
  releaseDate: string;
  posterPath: string;
  overview: string;
  genres: string[];
  backdropPath: string;
}

export default function MovieCard({
  title,
  points,
  releaseDate,
  posterPath,
  overview,
  genres,
  backdropPath,
}: Props) {
  return (
    <Container>
      <Poster
        id="poster"
        poster={`${configs.imagesURL}/w500/${posterPath}`}
        backdrop={`${configs.imagesURL}/w500/${backdropPath}`}
      />
      <RightCol>
        <div>
          <Strip />
          <Header>
            <PointsBadge percentage={points * 10} />
            <TextsContainer>
              <h1>{title}</h1>
              <h3>{new XDate(releaseDate).toString('dd/MM/yyyy')}</h3>
            </TextsContainer>
          </Header>
        </div>
        <Content>
          <p>{overview}</p>
          {genres.map(genre => <GenreTag key={genre} title={genre} />)}
        </Content>
      </RightCol>
    </Container>
  );
}
