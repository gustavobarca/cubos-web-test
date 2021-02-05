import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  .page-content {
    flex-grow: 1;
    display: flex;
    padding: 50px 5%;
    flex-direction: column;
  }

  #movies-content {
    margin-top: 50px;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0px;
  margin-top: 100px;
`;

export const ErrorText = styled.h3`
  font-family: 'Abel-Regular';
  color: ${props => props.theme.colors.primary};
`;
