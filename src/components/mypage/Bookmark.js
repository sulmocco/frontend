import React from "react";
import styled from "styled-components";

const Bookmark = () => {
  return (
    <div>
      <div>
        <Content>
          <img src="/images/none.png" alt="북마크"></img>
          <div style={{ fontSize: "28px" }}>북마크한 술상이 없습니다!</div>
          <div
            style={{
              color: "#b5b5b5",
              marginTop: "5px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            마음에 드는 술상을 북마크해보세요!
          </div>
        </Content>
      </div>
    </div>
  );
};

export default Bookmark;

const Content = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
