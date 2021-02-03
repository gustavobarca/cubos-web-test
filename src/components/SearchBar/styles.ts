import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
`;

export const Input = styled.input`
  background-color: ${props => props.theme.colors.inputBackground};
  border: none;
  height: 35px;
  border: 2px solid ${props => props.theme.colors.inputBackground};
  font-family: 'CircularStd-Book';
  font-size: 12px;
  border-radius: 5px;
  padding-left: 30px;
  padding-right: 10px;
  transition: all 0.1s;
  box-sizing: border-box;
  width: 100%;

  &:focus {
    border: 2px solid ${props => props.theme.colors.primary};
    outline: none;
  }

  ::placeholder {
    color: ${props => props.theme.colors.secondaryText};
  }
`;
