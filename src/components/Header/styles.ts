import styled from 'styled-components';

export const Container = styled.header`
  height: 70px;
  background-color: ${props => props.theme.colors.primary};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.h1`
  cursor: pointer;
  font-family: 'Abel-Regular';
  color: ${props => props.theme.colors.complementary};
  font-weight: 100;
`;
