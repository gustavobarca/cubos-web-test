import styled from 'styled-components';

export default styled.main`
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
