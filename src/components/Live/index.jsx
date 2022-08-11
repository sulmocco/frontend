import React, { useEffect, useState } from "react";
import axios from "axios";

import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import {
  Wrap, LiveWrap, Title, Container,
  Pre, Next, Listbox, Image, ProfileBox, Desc, ProfileImage,  
  Profile
} from "./styles";

import {AlchholTag, SnackTag, ThemeTag} from "../../styles/CommonStyles"
import sulmoggoApi from "../../shared/apis";

const Live = () => {
  const [list, setList] = useState([]);

  // Live 목록 불러오기
  const getLiveList = async () => {
    try {
      const res = await sulmoggoApi.live();
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLiveList();
  }, []);

  // 지금 인기있는 술약속 슬라이드 설정
  const [slide, setSlide] = useState(false);
  const moveSlide = () => {
    setSlide(!slide);
  };

  return (
    <Wrap>
      <LiveWrap>
      <Title>지금 인기있는 술약속</Title>
      <div
        style={{
          position: "absolute",
          top: "30px",
          right: "0",
          fontSize: "16px",
        }}
      >
        더보기 &gt;
      </div>
      <Container>
        {slide ? (
          <Pre
            onClick={() => {
              moveSlide();
            }}
          >
            <AiOutlineLeft />
          </Pre>
        ) : null}
        {slide ? null : (
          <Next
            onClick={() => {
              moveSlide();
            }}
          >
            <AiOutlineRight />
          </Next>
        )}

        {list.map((v, i) => {
          return (
            <Listbox key={i} slide={slide}>
              <Image src={v.thumbnail} alt="썸네일"></Image>
              <ProfileBox>
                <ProfileImage
                  src="/images/icon-all.png"
                  alt="프로필사진"
                ></ProfileImage>
                <Profile>
                  <p style={{ fontSize: "26px", fontWeight: "700" }}>
                    {v.title.length <= 12
                      ? v.title
                      : v.title.slice(0, 12) + "..."}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "400",
                      color: "#2459E0",
                    }}
                  >
                    {v.username}
                  </p>
                </Profile>
              </ProfileBox>
              <Desc>
                <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  <img src="/images/live-clock.svg"
                  alt="프로필사진" />
                  <span>{v.time}</span>
                </div>
                <div style={{ margin: "0 10px", fontSize: "16px" }}>|</div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                 <img src="/images/live-people.svg"
                  alt="프로필사진" />
                  <span>{v.members}</span>
                </div>
              </Desc>
              <div style={{ display: "flex", marginTop: "40px" }}>
                <AlchholTag style= {{marginRight : "10px"}}>{v.theme}</AlchholTag>
                <SnackTag style= {{marginRight : "10px"}}>{v.alcohol}</SnackTag>
                <ThemeTag>{v.food}</ThemeTag>
              </div>
            </Listbox>
          );
        })}
      </Container>
      </LiveWrap>
    </Wrap>
  );
};

export default Live;

