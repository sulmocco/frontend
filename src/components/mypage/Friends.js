import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import sulmoggoApi from "../../shared/apis";
import FriendList from "../friend";
import { TablesGrid } from "./styles";

const Friends = () => {
  const { data } = useQuery(["friend"], () =>
    sulmoggoApi.getFriends().then((res) => res.data)
  );

  console.log(data);

  return (
    <Container>
      {data?.length >= 1 ? (
        <ul>
          {data?.map((friend, index) => (
            <FriendList {...friend} key={index} />
          ))}
        </ul>
      ) : (
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
      )}
    </Container>
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

const Container = styled.div`
  width: ${(props) => props.theme.contentWidth};
  display: flex;
  margin: 0 auto;
  justify-content: center;
  ul {
    width: 100%;
    display: flex;
    margin-top: 7.2rem;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4rem 3.2rem;
    padding: 0 1.4rem;
  }
`;
