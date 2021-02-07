import GenreTag from 'components/GenreTag';
import React from 'react';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { Genre } from 'types';
import Container from './styles';

interface Props {
  genres: Genre[],
  selectedGenre?: Genre,
  onChange: (genre: Genre) => void;
  loading: boolean;
}

export default function GenreFilter({
  genres,
  selectedGenre,
  onChange,
  loading,
}: Props) {
  const { colors } = useTheme();

  if (loading) {
    return (
      <Container loading={1}>
        <PulseLoader
          color={colors.primary}
          loading
          size={10}
        />
      </Container>
    );
  }

  return (
    <Container loading={0}>
      {genres.map(genre => (
        <GenreTag
          key={genre.id}
          active={selectedGenre ? selectedGenre.id === genre.id : false}
          title={genre.name}
          onClick={() => onChange(genre)}
        />
      ))}
    </Container>
  );
}

GenreFilter.defaultProps = {
  selectedGenre: undefined,
};
