import styled from 'styled-components';

export const Message = styled.h2`
  font-family: 'Abel-Regular';
  color: ${props => props.theme.colors.primaryText};
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35vh;
`;
