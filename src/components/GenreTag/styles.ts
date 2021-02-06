import styled, { css } from 'styled-components';

export default styled.button<{ isClickable: boolean; active: boolean }>`
  background-color: white;
  padding: 3px 10px;
  border: 1px solid ${props => props.theme.colors.primary};
  display: inline-block;
  border-radius: 20px;
  font-size: 16px;
  font-family: 'Abel-Regular';
  color: ${props => props.theme.colors.primary};
  margin-right: 10px;
  outline: none;
  transition: opacity 0.1s;

  ${props => props.isClickable && css`
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  `}

  ${props => props.active && css`
    background-color: ${props => props.theme.colors.primary};
    color: white;
  `}
`;
