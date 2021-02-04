import styled from 'styled-components';

export default styled.input`
  background-color: ${props => props.theme.colors.foreground};
  border: none;
  height: 45px;
  border: 2px solid ${props => props.theme.colors.foreground};
  font-family: 'Abel-Regular';
  font-size: 16px;
  border-radius: 30px;
  padding-left: 30px;
  transition: all 0.1s;
  box-sizing: border-box;
  width: 100%;

  &:focus {
    border: 2px solid ${props => props.theme.colors.complementary};
    outline: none;
  }

  ::placeholder {
    color: ${props => props.theme.colors.primary};
  }
`;
