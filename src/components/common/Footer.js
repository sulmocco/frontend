import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrap>
      <Container>
        <div>
          <img src="/images/logo_gray.svg" alt="술모꼬 로고" />
        </div>
        <div>
          <div className="upper">
            <p>이용약관</p>
            <FooterSeparator />
            <p>개인정보처리방침</p>
          </div>
          <p className="copyright">
            Copyright ⓒ 2022 술모꼬 All Right Reserved.
          </p>
        </div>
      </Container>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.div`
  border-top: 1px solid #e1e1e1;
  background-color: #4e4e56;
  height: ${props => props.theme.footerSize};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    height: ${props => props.theme.footerSizeMobile};
    padding: 2rem;
  }
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
  img {
    width: 20.503rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        width: 15rem;
    }
  }
  div {
    font-size: 1.6rem;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .upper {
    color: ${(props) => props.theme.white};
    font-size: 1.4rem;
    letter-spacing: -0.04em;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.6rem;
    align-items: center;
  }
  .copyright {
    font-size: 1.4rem;
    font-weight: 400;
    color: ${(props) => props.theme.grey_03};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        font-size: 1rem;
    }
  }
`;

const FooterSeparator = styled.div`
  display: inline-block;
  width: 0.1rem;
  height: 1.2rem;
  background-color: ${(props) => props.theme.grey_04};
`;
