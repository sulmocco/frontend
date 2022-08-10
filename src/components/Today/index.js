import React from "react";
import sulmoggoApi from "../../shared/apis";
import { OneRankWrapper } from "./styles";
import {
  Wrap,
  Container,
  RankWrapper,
  TableCardWrapper,
} from "./styles";
import { useQuery } from "@tanstack/react-query";
import {
  AlchholTag,
  FreeTag,
  UserLevel,
} from "../../styles/CommonStyles";

const Today = () => {
  const getToday = async () => {
    const res = await sulmoggoApi.today();
    return res.data;
  };
  const today = useQuery(["today"], getToday, {
    onSuccess: (data) => {
      console.log(data);
    },
  }).data;

  console.log(today);
  return (
    <Wrap>
      <Container>
        <h2>오늘의 술상</h2>

        <RankWrapper>
          {today[1] && (
            <OneRankWrapper>
              <div className="crown">
                <img src="/images/today_2ndcrown.svg" alt="second profile"/>
              </div>
              <TableCardWrapper
                src={today[1].thumbnail}
                profile={today[1].profileimgurl}
              >
                <div className="img" />
                <div className="bottom">
                  <div className="profile" />
                  <div className="title">{today[1].title}</div>
                  <UserLevel style={{ marginTop: "1rem" }}>
                    {today[1].level}
                  </UserLevel>
                  <div className="username">{today[1].username}</div>
                  <div className="tags">
                    <AlchholTag>{today[1].alcoholtag}</AlchholTag>
                    <FreeTag>{today[1].freetag}</FreeTag>
                  </div>
                </div>
              </TableCardWrapper>
            </OneRankWrapper>
          )}

          {today[0] && (
            <OneRankWrapper first>
              <div className="crown">
                <img src="/images/today_1stcrown.svg"  alt="first profile"/>
              </div>
              <TableCardWrapper
                first
                src={today[0].thumbnail}
                profile={today[0].profileimgurl}
              >
                <div className="img" />
                <div className="bottom">
                  <div className="profile" />
                  <div className="title">{today[0].title}</div>
                  <UserLevel style={{ marginTop: "1rem" }}>
                    {today[0].level}
                  </UserLevel>
                  <div className="username">{today[0].username}</div>
                  <div className="tags">
                    <AlchholTag>{today[0].alcoholtag}</AlchholTag>
                    <FreeTag>{today[0].freetag}</FreeTag>
                  </div>
                </div>
              </TableCardWrapper>
            </OneRankWrapper>
          )}

          {today[2] && (
            <OneRankWrapper>
              <div className="crown">
                <img src="/images/today_3rdcrown.svg" alt="third profile"/>
              </div>
              <TableCardWrapper
                src={today[2].thumbnail}
                profile={today[2].profileimgurl}
              >
                <div className="img" />
                <div className="bottom">
                  <div className="profile" />
                  <div className="title">{today[2].title}</div>
                  <UserLevel style={{ marginTop: "1rem" }}>
                    {today[2].level}
                  </UserLevel>
                  <div className="username">{today[2].username}</div>
                  <div className="tags">
                    <AlchholTag>{today[2].alcoholtag}</AlchholTag>
                    <FreeTag>{today[2].freetag}</FreeTag>
                  </div>
                </div>
              </TableCardWrapper>
            </OneRankWrapper>
          )}
        </RankWrapper>
      </Container>
    </Wrap>
  );
};

export default Today;
