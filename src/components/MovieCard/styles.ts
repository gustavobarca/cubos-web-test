import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-bottom: 50px;
  transition: opacity 0.1s;
  cursor: pointer;

  @media(max-width: 800px) {
    flex-direction: column;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const Poster = styled.div<{ poster: string; backdrop: string }>`
  background-image: url(${props => props.poster});
  width: 200px;
  min-height: 300px;
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
  min-width: 0;

  #strip {
    background-color: ${props => props.theme.colors.primary};
    width: 100%;
    height: 60px;
  }

  #movie-header {
    display: flex;
    padding: 20px;
    margin-top: -65px;
    min-width: 0;
  }
  
  #movie-header h1 {
    font-family: 'Abel-Regular';
    color: ${props => props.theme.colors.complementary};
    font-weight: 100;
    font-size: 32px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  #movie-header h3 {
    font-family: 'Lato-Thin';
    color: ${props => props.theme.colors.secondaryText};
    margin-top: 10px;
  }

  #movie-text-container {
    margin-left: 15px;
    min-width: 0;
  }

  #movie-content {
    padding: 0px 30px;
    flex: 1;
  }

  #movie-content p {
    font-family: 'Lato-Regular';
    color: ${props => props.theme.colors.secondaryText};
    margin-bottom: 20px;
  }

  @media(max-width: 800px) {
    #strip {
      height: 50px;
    }

    #movie-header {
      flex-direction: column; 
    }

    #movie-header h1 {
      font-size: 24px;
      color: ${props => props.theme.colors.primary};
    }

    #movie-text-container {
      margin-left: 10px;
      margin-top: 10px;
    }
  }
`;
