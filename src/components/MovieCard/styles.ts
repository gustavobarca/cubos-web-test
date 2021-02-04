import styled from 'styled-components';

export const Container = styled.div`
  background-color: red;
  margin: 20px 0px;
  display: flex;

  @media(max-width: 800px) {
    background-color: blue;
    flex-direction: column;
  }
`;

export const Poster = styled.div<{ poster: string; backdrop: string }>`
  background-image: url(${props => props.poster});
  width: 200px;
  height: 300px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media(max-width: 800px) {
    width: auto;
    height: 200px;
    background-image: url(${props => props.backdrop});
  }
`;

export const RightCol = styled.div`
  background-color: ${props => props.theme.colors.foreground};
  flex: 1;
  padding-bottom: 20px;
`;

export const Strip = styled.div`
  background-color: ${props => props.theme.colors.primary};
  width: 100%;
  height: 60px;
`;

export const TextsContainer = styled.div`
  margin-left: 15px;
`;

export const Header = styled.div`
  display: flex;
  padding: 20px;
  margin-top: -65px;

  h1 {
    font-family: 'Abel-Regular';
    color: ${props => props.theme.colors.complementary};
    font-weight: 100;
  }

  h3 {
    font-family: 'Lato-Thin';
    color: ${props => props.theme.colors.secondaryText};
    margin-top: 10px;
  }

  @media(max-width: 800px) {
    h1 {
      font-size: 24px;
    }
  }
`;

export const Content = styled.div`
  padding: 0px 30px;
  flex: 1;

  p {
    font-family: 'Lato-Regular';
    color: ${props => props.theme.colors.secondaryText};
    margin-bottom: 10px;
  }
`;
