import React from "react";
import styled from "styled-components";

const Recommend = () => {
  return (
    <Wrap>
      <Container>이 상품 어때요?</Container>
    </Wrap>
  );
};

export default Recommend;

const Wrap = styled.div`
  margin-top: 20px;
`;

const Container = styled.div`
  border: 1px solid black;
  height: 450px;
`;
