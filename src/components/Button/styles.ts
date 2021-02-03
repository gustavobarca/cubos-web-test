import styled from 'styled-components';

export default styled.button`
  padding: 14px 33px 14px;
  border-radius: 8px;
  font-size: 16px;
  color: #FFF;
  border: none;
  outline: none;
  background-color: ${props => props.color || props.theme.colors.primary};
  font-family: 'CircularStd-Book';
  box-shadow: 0 1px 3px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.12);
  transition: all 0.1s;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
