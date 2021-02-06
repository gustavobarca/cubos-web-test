import styled from 'styled-components';

export default styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => (props.size * 2)}px;
  border: ${props => `${props.size / 14}px solid ${props.theme.colors.complementary}`};
  box-shadow: ${props => `0 0 0 ${props.size * 0.03}pt ${props.theme.colors.primary}`};;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 5px;

  h2 {
    font-family: 'Abel-Regular';
    color: ${props => props.theme.colors.complementary};
    font-size: ${props => props.size * 0.4}px;
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
