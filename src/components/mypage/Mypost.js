import React from "react";
import styled from "styled-components";

const Mypost = () => {
  return (
    <div>
      <div>
        <Content>
          <img src="/images/none.png" alt="북마크"></img>
          <div style={{ fontSize: "28px" }}>본인이 작성한 술상이 없습니다!</div>
          <div
            style={{
              color: "#b5b5b5",
              marginTop: "5px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            자신만의 술상을 공유해주세요!
          </div>
        </Content>
      </div>
    </div>
  );
};

export default Mypost;

const Content = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
