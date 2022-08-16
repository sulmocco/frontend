import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrap>
      <Container>
        <div>
          <img src="/images/logo_gray.svg" alt="술모꼬 로고"/>
        </div>
        <div>
          <div>
            
          </div>
        <p>이용약관 <FooterSeparator /> 개인정보처리방침</p>
        <p>Copyright ⓒ 2022 술모꼬 All Right Reserved.</p>
        </div>
      </Container>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.div`
  border-top: 1px solid #e1e1e1;
  background-color: #4e4e56;
  height: 17.6rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  img{
    width: 20.503rem;
  }
  div {
    font-size: 1.6rem;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  p {
    color: ${props => props.theme.white};
    font-size: 1.4rem;
    letter-spacing: -0.04em;
    font-weight: 500;
    display: flex;
    gap: .6rem;
    align-items: center;
    &:last-child{
      font-size: 1.4rem;
      font-weight: 400;
      color: ${props => props.theme.grey_03};
    }
  }
`;

const FooterSeparator = styled.div`
display: inline-block;
width: .1rem;
height: 1.2rem;
background-color: ${props => props.theme.grey_04};
`
