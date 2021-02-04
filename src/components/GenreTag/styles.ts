import styled from 'styled-components';

export default styled.span`
  background-color: white;
  padding: 3px 10px;
  border: 1px solid ${props => props.theme.colors.primary};
  display: inline-block;
  border-radius: 20px;
  font-size: 16px;
  font-family: 'Abel-Regular';
  color: ${props => props.theme.colors.primary};
  margin-top: 10px;
  margin-right: 10px;
`;
