import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import sulmoggoApi from "../../shared/apis";
import FriendList from "../friend";
import Nodata from "../nodatalending/styles";

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
          <Nodata />
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
