import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { GiAlarmClock } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const Live = () => {
  const [list, setList] = useState([]);

  // Live 목록 불러오기
  const getLiveList = async () => {
    try {
      const res = await axios.get("http://localhost:5001/room");
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
                  <GiAlarmClock />
                  <span>{v.time}</span>
                </div>
                <div style={{ margin: "0 10px", fontSize: "16px" }}>|</div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  <BsFillPeopleFill />
                  <span>{v.members}</span>
                </div>
              </Desc>
              <div style={{ display: "flex" }}>
                <Tag1>{v.theme}</Tag1>
                <Tag2>{v.theme}</Tag2>
                <Tag3>{v.theme}</Tag3>
              </div>
            </Listbox>
          );
        })}
      </Container>
    </Wrap>
  );
};

export default Live;

const Wrap = styled.div`
  position: relative;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: 70px;
`;

const Container = styled.div`
  display: flex;
  margin: 70px 0;
  overflow: hidden;
  svg {
    font-size: 24px;
  }
`;

const Pre = styled.button`
  position: absolute;
  background: white;
  width: 48px;
  height: 48px;

  outline: none;
  border: none;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px gray;

  display: flex;
  justify-content: center;
  align-items: center;

  left: -25px;
  top: 220px;
  z-index: 100;

  svg {
    fill: gray;
    font-size: 28px;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Next = styled.button`
  position: absolute;
  background: white;
  width: 48px;
  height: 48px;

  outline: none;
  border: none;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px gray;

  display: flex;
  justify-content: center;
  align-items: center;

  right: -25px;
  top: 220px;
  z-index: 100;

  svg {
    fill: gray;
    font-size: 28px;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Listbox = styled.div`
  margin-right: 20px;
  width: 100%;

  transform: ${(props) => (props.slide ? "translateX(-1000px)" : "0")};
  transition: 1s;
`;

const Image = styled.img`
  width: 420px;
  height: 260px;
  border-radius: 10px;
`;

const ProfileBox = styled.div`
  display: flex;
  margin-top: 30px;
`;

const Desc = styled.div`
  display: flex;
  margin-top: 10px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin-left: 5px;
    }
  }
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid black;
`;

const Profile = styled.div`
  width: 264px;
  height: 64px;

  display: flex;
  flex-direction: column;
  margin-left: 20px;
  justify-content: center;
`;

const Tag1 = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 40px;
  margin-right: 10px;

  background: #ffda93;
  border-radius: 20px;
  padding: 5px 12px 4px;
`;

const Tag2 = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 40px;
  margin-right: 10px;

  background: #ffefb7;
  border-radius: 20px;
  padding: 5px 12px 4px;
`;

const Tag3 = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 40px;

  background: #eef3ff;
  border-radius: 20px;
  padding: 5px 12px 4px;
`;
