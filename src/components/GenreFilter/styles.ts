import styled, { css } from 'styled-components';

export default styled.div<{ loading: boolean }>`
  margin-bottom: 10px;
  margin-top: 30px;
  
  ${props => props.loading && css`
    display: flex;
    align-items: end;
    justify-content: center;
    margin-top: 50px;
  `}
`;
