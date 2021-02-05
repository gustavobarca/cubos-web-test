import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .pagination-btn {
    background-color: ${props => props.theme.colors.background};
    width: 40px;
    height: 40px;
    outline: none;
    border-radius: 20px;
    color: ${props => props.theme.colors.primary};
    border: 3px solid ${props => (props.theme.colors.background)};
    cursor: pointer;
    margin: 0px 5px;
  }

  .pagination-btn span {
    font-size: 16px;
  }

  .pagination-btn:hover {
    background-color: ${props => props.theme.colors.foreground}
  }

  .pagination-active {
    background-color: ${props => props.theme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80px;
    overflow: hidden;
    outline: none;
    border-color: ${props => (props.theme.colors.complementary)};
    box-shadow: 0 0 0 1pt ${props => props.theme.colors.primary};
  }

  .pagination-active:hover {
    background-color: ${props => props.theme.colors.primary};
  }

  .pagination-btn span {
    font-family: 'Abel-Regular';
    font-weight: 100;
  }

  .pagination-active span {
    font-size: 24px;
    color: ${props => props.theme.colors.complementary};
  }
`;
