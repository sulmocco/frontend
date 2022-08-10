import React from "react";
import styled from "styled-components";
import {Wrap, Container, Title, RankWrapper, TableCardWrapper} from "./styles"

const Today = () => {
  return (
    <Wrap>
      <Container>
        <h2>오늘의 술상</h2>
        <RankWrapper>
        <TableCardWrapper src="https://images.unsplash.com/photo-1659467112146-0c81519e02ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80">
            <div className="img">
              heyheyhey
            </div>
            <div className="bottom">
              이것저것
            </div>
          </TableCardWrapper>
          <TableCardWrapper first src="https://images.unsplash.com/photo-1659467112146-0c81519e02ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80">
            <img src="/images/today_1stcrown.svg" />
            <div className="img">
              heyheyhey
            </div>
            <div className="bottom">
              이것저것
            </div>
          </TableCardWrapper>
        </RankWrapper>
      </Container>
    </Wrap>
  );
};

export default Today;


