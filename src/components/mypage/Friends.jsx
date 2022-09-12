import { useQuery } from "@tanstack/react-query";
import React from "react";
import sulmoggoApi from "../../shared/apis";
import FriendList from "../friend";
import Nodata from "../nodatalending";
import { Container } from './styles';

const Friends = () => {
  const { data } = useQuery(["friend"], () =>
    sulmoggoApi.getFriends().then((res) => res.data)
  );

  return (
    <Container>
      {data?.length >= 1 ? (
        <ul>
          {data?.map((friend, index) => (
            <FriendList {...friend} key={friend.username} />
          ))}
        </ul>
      ) : (
        <Nodata />
      )}
    </Container>
  );
};

export default Friends;
