import React from "react";
import styled from "styled-components";

const Live = () => {
  return (
    <Wrap>
      <Container>지금 인기있는 술약속</Container>
    </Wrap>
  );
};

export default Live;

const Wrap = styled.div`
  margin-top: 20px;
`;

const Container = styled.div`
  border: 1px solid black;
  height: 450px;
`;
