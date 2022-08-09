import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrap>
      <Container>
        <div>술모꼬</div>
        <p>항해99 X 동북ICT 이노베이션캠프</p>
        <p>Copyrightⓒ.2022.실전프로젝트4조.All Rights Reserved.</p>
      </Container>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.div`
  border-top: 1px solid #e1e1e1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;

  div {
    font-size: 24px;
    font-weight: 550;
  }
  p {
    color: #b5b5b5;
    margin: 5px 0;
    font-size: 14px;
  }
`;
