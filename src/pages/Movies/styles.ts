import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  h2 {
    font-family: 'CircularStd-Bold';
    margin-top: 60px;
    margin-bottom: 20px;
  }

  #login-container {
    width: 25%;
    flex-direction: column;
    display: flex;
  }
`;

export const OrLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 10px;

  hr {
    border: none;
    border-bottom: 0.5px solid ${props => props.theme.colors.border};
    flex: 1;
    width: 100px;
  }

  span {
    font-size: 15px;
    padding: 0px 10px;
    font-family: 'CircularStd-Book';
    color: ${props => props.theme.colors.secondaryText};
  }  
`;

export const ForgotPasswordText = styled.a`
  color: ${props => props.theme.colors.primary};
  font-family: 'CircularStd-Book';
  text-decoration: none;
  text-align: center;
  margin-top: 30px;
  font-size: 16px;
`;

export const CreateAccountText = styled.p`
  color: ${props => props.theme.colors.primaryText};
  font-family: 'CircularStd-Book';
  text-align: center;
  font-size: 16px;
  margin-top: 10px;

  a {
    color: ${props => props.theme.colors.primary};
    font-family: 'CircularStd-Book';
    text-decoration: none;
    margin-left: 5px;
    font-size: 16px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  height: 70px;
  width: 100%;
  padding-left: 30px;
  box-sizing: border-box;

  img {
    width: 110px;
  }
`;
