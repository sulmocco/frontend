import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { GiAlarmClock } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";

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
        {list.map((v, i) => {
          return (
            <div key={i} style={{ marginRight: "20px" }}>
              <Image src="/images/icon-all.png" alt="썸네일"></Image>
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
                <Tag>{v.theme}</Tag>
              </div>
            </div>
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

const Image = styled.img`
  width: 420px;
  height: 260px;
  border: 1px solid black;
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

const Tag = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 40px;

  background: #ffda93;
  border-radius: 20px;
  padding: 5px 12px 4px;
`;
