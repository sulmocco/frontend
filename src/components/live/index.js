import React, { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  AlchholTag,
  SnackTag,
  ThemeTag,
  NoList,
} from "../../styles/CommonStyles";
import sulmoggoApi from "../../shared/apis";
import styled from "styled-components";

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
                      <img src="/images/live-clock.svg" alt="프로필사진" />
                      <span>{v.time}</span>
                    </div>
                    <div style={{ margin: "0 10px", fontSize: "16px" }}>|</div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      <img src="/images/live-people.svg" alt="프로필사진" />
                      <span>{v.members}</span>
                    </div>
                  </Desc>
                  <div style={{ display: "flex", marginTop: "40px" }}>
                    <AlchholTag style={{ marginRight: "10px" }}>
                      {v.theme}
                    </AlchholTag>
                    <SnackTag style={{ marginRight: "10px" }}>
                      {v.alcohol}
                    </SnackTag>
                    <ThemeTag>{v.food}</ThemeTag>
                  </div>
                </Listbox>
              );
            })}
          </Container>
        )}
        {list.length === 0 && (
          <NoList>
            진행중인 술약속이 없습니다.
            <br />
            직접 술약속을 잡아보세요!
          </NoList>
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
  margin-right: 10px;
  width: 420px;

  transform: ${(props) => (props.slide ? "translateX(-900px)" : "0")};
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
