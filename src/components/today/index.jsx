import React from "react";
import sulmoggoApi from "../../shared/apis";
import { OneRankWrapper } from "./styles";
import { Wrap, Container, RankWrapper, TableCardWrapper } from "./styles";
import { useQuery } from "@tanstack/react-query";
import {
  AlchholTag,
  FreeTag,
  NoList,
  Separator,
  UserLevel,
} from "../../styles/CommonStyles";
import { Link } from "react-router-dom";
import { getLevel } from "../../shared/modules";

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

        {today && (
          <RankWrapper>
            {today[1] && (
              <OneRankWrapper>
                <div className="crown">
                  <img src="/images/today_2ndcrown.svg" alt="second profile" />
                </div>
              <Link to={`tables/${today[1]?.tableId}`}>
                <TableCardWrapper
                  src={today[1]?.thumbnail}
                  profile={today[1]?.profileimgurl}
                >
                  <div className="img" />
                  <div className="bottom">
                    <div className="profile" />
                    <div className="counterWrap">
                      <img src="/images/icon_favorite.svg" alt="heart"/>
                      {today[1].likecount} <Separator />
                      <img src="/images/icon_eye.svg" alt="eye"/>
                      {today[1].viewcount}
                    </div>
                    <div className="title">{today[1]?.title}</div>

                    <div className="username">
                      <p>{today[1]?.username}</p>
                      <UserLevel style={{ display: "inline-block" }}>
                        {getLevel(today[1]?.level)}
                      </UserLevel>
                    </div>
                    <div className="tags">
                      <AlchholTag>{today[1]?.alcoholtag}</AlchholTag>
                      <FreeTag>{today[1]?.freetag}</FreeTag>
                    </div>
                  </div>
                </TableCardWrapper>
              </Link>
              </OneRankWrapper>
            )}

            {today[0] && (
              <OneRankWrapper first>
                <div className="crown">
                  <img src="/images/today_1stcrown.svg" alt="first profile" />
                </div>
              <Link to={`tables/${today[0]?.tableId}`}>
                <TableCardWrapper
                  first
                  src={today[0]?.thumbnail}
                  profile={today[0]?.profileimgurl}
                >
                  <div className="img" />
                  <div className="bottom">
                    <div className="profile" />
                    <div className="counterWrap">
                      <img src="/images/icon_favorite.svg" alt="heart" />
                      {today[0].likecount} <Separator />
                      <img src="/images/icon_eye.svg" alt="eye" />
                      {today[0].viewcount}
                    </div>
                    <div className="title">{today[0]?.title}</div>

                    <div className="username">
                      {today[0]?.username}
                      <UserLevel>{getLevel(today[0]?.level)}</UserLevel>
                    </div>
                    <div className="tags">
                      <AlchholTag>{today[0]?.alcoholtag}</AlchholTag>
                      <FreeTag>{today[0]?.freetag}</FreeTag>
                    </div>
                  </div>
                </TableCardWrapper>
              </Link>
              </OneRankWrapper>
            )}

            {today[2] && (
              <OneRankWrapper>
                <div className="crown">
                  <img src="/images/today_3rdcrown.svg" alt="third profile" />
                </div>
                <Link to={`tables/${today[2]?.tableId}`}>
                <TableCardWrapper
                  src={today[2]?.thumbnail}
                  profile={today[2]?.profileimgurl}
                >
                  <div className="img" />
                  <div className="bottom">
                    <div className="profile" />
                    <div className="counterWrap">
                      <img src="/images/icon_favorite.svg" alt="heart" />
                      {today[2].likecount} <Separator />
                      <img src="/images/icon_eye.svg" alt="eye" />
                      {today[2].viewcount}
                    </div>
                    <div className="title">{today[2]?.title}</div>

                    <div className="username">
                      {today[2]?.username}
                      <UserLevel>{getLevel(today[2]?.level)}</UserLevel>
                    </div>
                    <div className="tags">
                      <AlchholTag>{today[2]?.alcoholtag}</AlchholTag>
                      <FreeTag>{today[2]?.freetag}</FreeTag>
                    </div>
                  </div>
                </TableCardWrapper>
                  </Link>
              </OneRankWrapper>
              
            )}
            {!today && <NoList>게시된 술상추천이 존재하지 않습니다.<br/>좋아하는 술과 안주를 직접 추천해보시는 건 어떨까요?</NoList>}
          </RankWrapper>
        )}
      </Container>
    </Wrap>
  );
};

export default Today;
