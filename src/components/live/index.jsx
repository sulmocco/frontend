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

const Live = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

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
    console.log(list);
  }, [list]);

  useEffect(() => {
    getLiveList();
  }, []);

  // 지금 인기있는 술약속 슬라이드 설정
  const [slide, setSlide] = useState(false);
  const moveSlide = () => {
    setSlide(!slide);
  };

  console.log(list)

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
                        <img src="/images/icon_clock.svg" alt="clock" />
                        <span>{new Date(v.createdAt).toLocaleString() || 0}</span>
                      </div>
                      <div style={{ margin: "0 10px", fontSize: "16px" }}>|</div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        <img src="/images/icon_people_black.svg" alt="people" />
                        <span>{v.userCount}</span>
                      </div>
                    </Desc>
                    <div style={{ display: "flex", marginTop: "40px" }}>
                      <AlchholTag style={{ marginRight: "10px" }}>
                        {v.theme}
                      </AlchholTag>
                      <SnackTag style={{ marginRight: "10px" }}>
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

const Wrap = styled.div`
  position: relative;
  height: 64.4rem;
`;

const LiveWrap = styled.div`
  position: relative;
  width: 1280px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: 70px;
  text-align: center;
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
  cursor: pointer;
  margin-right: 10px;
  width: 420px;
  transform: ${(props) => (props.slide ? "translateX(-900px)" : "0")};
  transition: 1s;
`;

const Image = styled.img`
  width: 420px;
  height: 260px;
  border-radius: 10px;
  object-fit: cover;
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
      color: ${props => props.theme.grey_02};
    }
  }
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

const Profile = styled.div`
  width: 264px;
  height: 64px;
  margin-left: 10px;

  display: flex;
  flex-direction: column;
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
