import styled from 'styled-components';

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  h4 {
    font-family: 'Abel-Regular';
    color: ${props => props.theme.colors.primary};
    font-size: 20px;
    font-weight: 100;
  }

  h5 {
    font-family: 'Lato-Light';
    color: ${props => props.theme.colors.primaryText};
    margin-top: 5px;
  }
`;

export const Container = styled.section`
  margin: 50px 0px;
  background-color: ${props => props.theme.colors.inputBackground};

   hr {
    height: 2px;
    background-color:  ${props => props.theme.colors.complementary};
    margin: 10px 0px;
    border: none;
  }

  #movie-dt-inside {
    display: flex;
  }

  #movie-dt-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 35px;
    background-color: ${props => props.theme.colors.middleLayer}
  }

  #movie-dt-header h1 {
    font-family: 'Abel-Regular';
    color: ${props => props.theme.colors.primary};
    font-weight: 100;
    font-size: 34px;
  }

  #movie-dt-header h3 {
    font-family: 'Lato-Thin';
    color: ${props => props.theme.colors.secondaryText};
    margin-top: 10px;
  }

  #movie-dt-infos {
    display: flex;
    justify-content: space-between;
  }

  #movie-dt-content {
    flex: 1;
    padding: 30px 35px;
  }

  #movie-dt-content h3 {
    font-family: 'Abel-Regular';
    color: ${props => props.theme.colors.primary};
    font-size: 24px;
    font-weight: 100;
  }

  #movie-dt-content h5 {
    font-size: 14px;
  }

  #movie-dt-content p {
    font-family: 'Lato-Regular';
    color: ${props => props.theme.colors.primaryText};
    margin-top: 20px;
    margin-bottom: 40px;
  }

  #movie-dt-footer {
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-top: 50px;
  }

  @media(max-width: 800px) {
    #movie-dt-inside {
      flex-direction: column-reverse;
    }
  }

  @media(max-width: 480px) {
    #movie-dt-infos {
      flex-direction: column;
    }

    ${Info} {
      margin-top: 20px;
    }

    #movie-dt-footer {
      flex-direction: column-reverse;
      align-items: center;
      margin-top: 25px;
    }

    #movie-dt-footer #genres-container {
      margin-top: 35px;
    }
  }
`;

export const Poster = styled.div<{ poster: string; backdrop: string }>`
  background-image: url(${props => props.poster});
  width: 300px;
  min-height: 300px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media(max-width: 800px) {
    width: auto;
    height: 200px;
    background-position: top;
    background-image: url(${props => props.backdrop});
  }
`;
