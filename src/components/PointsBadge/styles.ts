import styled from 'styled-components';

export default styled.div`
  width: 75px;
  height: 75px;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  overflow: hidden;
  margin-top: 5px;

  div {
    width: 60px;
    height: 60px;
    background-color: ${props => props.theme.colors.primary};
    border: 4px solid ${props => props.theme.colors.complementary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
  }

  h2 {
    font-family: 'Abel-Regular';
    color: ${props => props.theme.colors.complementary};
    font-weight: 100;
  }
`;
