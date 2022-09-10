import React, { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  AlchholTag,
  SnackTag,
  ThemeTag,
} from "../../styles/CommonStyles";
import sulmoggoApi from "../../shared/apis";
import styled from "styled-components";
import Nodata from '../nodatalending';
import { Container, Listbox, LiveWrap, Title, Wrap, Image, ProfileImage, ProfileBox, Desc, Profile } from './styles';

const Live = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  // Live 목록 불러오기
  const getLiveList = async () => {
    try {
      const res = await sulmoggoApi.live();
      setList(res.data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    // console.log(list);
  }, [list]);

  useEffect(() => {
    getLiveList();
  }, []);

  // 지금 인기있는 술약속 슬라이드 설정
  const [slide, setSlide] = useState(false);
  const moveSlide = () => {
    setSlide(!slide);
  };

  // console.log(list)

  return (
    <Wrap>
      <LiveWrap>
        <Title>지금 인기있는 술약속</Title>
        <div
          style={{
            position: "absolute",
            top: "3rem",
            right: "0",
            fontSize: "1.6rem",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/rooms");
          }}
        >
          더보기 &gt;
        </div>
        {list.length !== 0 && (
          <Container>
            {list.map((v, i) => {
              return (
                <Link to={`/chat/${v.chatRoomId}`}>
                  <Listbox key={i} slide={slide}>
                    <Image src={v.thumbnail || '/images/placeholder.png'} alt="썸네일"></Image>
                    <ProfileBox>
                      <ProfileImage
                        src={v.profileimgurl || '/images/profile_default.svg'}
                        alt="프로필사진"
                      ></ProfileImage>
                      <Profile>
                        <p style={{ fontSize: "2.6rem", fontWeight: "700" }}>
                          {v.title.length <= 12
                            ? v.title
                            : v.title.slice(0, 12) + "..."}
                        </p>
                        <p
                          style={{
                            fontSize: "2rem",
                            fontWeight: "400",
                            color: "#2459E0",
                          }}
                        >
                          {v.username}
                        </p>
                      </Profile>
                    </ProfileBox>
                    <Desc>
                      <div style={{ fontSize: "1.6rem,", fontWeight: "400" }}>
                        <img src="/images/icon_clock.svg" alt="clock" />
                        <span>{new Date(v.createdAt).toLocaleString() || 0}</span>
                      </div>
                      <div style={{ margin: "0 1rem", fontSize: "1.6rem" }}>|</div>
                      <div
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: "400",
                        }}
                      >
                        <img src="/images/icon_people_black.svg" alt="people" />
                        <span>{v.userCount}</span>
                      </div>
                    </Desc>
                    <div style={{ display: "flex", marginTop: "4rem" }}>
                      <AlchholTag style={{ marginRight: "1rem" }}>
                        {v.theme}
                      </AlchholTag>
                      <SnackTag style={{ marginRight: "1rem" }}>
                        {v.alcoholtag}
                      </SnackTag>
                      <ThemeTag>{v.food}</ThemeTag>
                    </div>
                  </Listbox>
                </Link>
              );
            })}
          </Container>
        )}
        {list.length === 0 && (
          <Nodata />
        )}
      </LiveWrap>
    </Wrap>
  );
};

export default Live;