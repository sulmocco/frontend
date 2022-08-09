import React from "react";
import styled from "styled-components";

const Today = () => {
  return (
    <Wrap>
      <Container>오늘의 술상</Container>
    </Wrap>
  );
};

export default Today;

const Wrap = styled.div`
  margin-top: 20px;
`;

const Container = styled.div`
  border: 1px solid black;
  height: 450px;
`;
