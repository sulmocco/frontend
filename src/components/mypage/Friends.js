import React from "react";
import styled from "styled-components";

const Friends = () => {
  return (
    <div>
      <div>
        <Content>
          <img src="/images/none.png" alt="북마크"></img>
          <div style={{ fontSize: "28px" }}>친구 목록이 없습니다!</div>
          <div
            style={{
              color: "#b5b5b5",
              marginTop: "5px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            마음에 드는 유저에게 친구 요청을 보내보세요!
          </div>
        </Content>
      </div>
    </div>
  );
};

export default Friends;

const Content = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;