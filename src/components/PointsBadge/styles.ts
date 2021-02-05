import styled from 'styled-components';

export default styled.div`
  min-width: 60px;
  height: 60px;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  overflow: hidden;
  margin-top: 5px;
  border: 4px solid ${props => props.theme.colors.complementary};
  box-shadow: 0 0 0 2pt ${props => props.theme.colors.primary};

  h2 {
    font-family: 'Abel-Regular';
    color: ${props => props.theme.colors.complementary};
    font-weight: 100;
  }

  @media(max-width: 800px) {
    width: 50px;
    height: 50px;
    
    h2 {
      font-size: 18px;
    }
  }
`;
