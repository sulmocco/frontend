import React from "react";
import styled from "styled-components";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/spinner";
import sulmoggoApi from "../../shared/apis";
import { getLevel } from '../../shared/modules';

const Mypage = () => {
  const navigate = useNavigate();
  // 마이페이지 계정정보 불러오기 api
  // const getMyAccount = async () => {
  //   try {
  //     const res = await sulmoggoApi.getUser();
  //     return res;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // // 마이페이지 계정정보 불러오기 query
  // const { data: account_query, status } = useQuery(
  //   ["my_account"],
  //   getMyAccount,
  //   {
  //     onSuccess: (data) => {
  //       console.log("쿼리 불러오기", data);
  //     },
  //   }
  // );

  const { data, status } = useQuery(['user'], () => sulmoggoApi.getUser().then(res => res.data), {
    cacheTime: 0,
  });
  console.log(data);

  // 쿼리 데이터 로딩전에 스피너
  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <Profile>
        <Wrap>
          <h1>마이페이지</h1>
          <ProfileBox>
            <img src={data?.profile || 'images/profile_default.svg'} alt="프로필 이미지" />
            <div className="info">
              <div className="level">{getLevel(data?.level)}</div>
              <div>{data?.username}</div>
            </div>
            <button onClick={() => navigate(`/mypage/edit`)}>수정하기</button>
          </ProfileBox>
        </Wrap>
      </Profile>
      <MypageNav>
        <ul>
          <li>
            <NavLink to="/mypage/bookmark">
              <div>북마크한 술상</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/mypage/mypost">
              <div>본인이 작성한 술상</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/mypage/friends">
              <div>친구 리스트</div>
            </NavLink>
          </li>
        </ul>
      </MypageNav>
      <Outlet />
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default Mypage;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  height: 561px;
  background: #eef3ff;
  border-radius: 10px;

  h1 {
    margin-top: 144px;
    font-weight: 700;
    font-size: 34px;
  }
`;

const Wrap = styled.div`
  width: 1290px;
  h1 {
    font-weight: 700;
    font-size: 34px;
  }
`;

const ProfileBox = styled.div`
  position: relative;
  margin-top: 56px;
  width: 1280px;
  height: 208px;
  background: #ffffff;
  border-radius: 10px;

  display: flex;
  align-items: center;

  img {
    width: 88px;
    height: 88px;
    margin-left: 32px;
    border-radius: 50%;
  }

  .info {
    margin-left: 16px;

    .level {
      font-weight: 500;
      font-size: 12px;
      width: 48px;
      height: 18px;
      background: #eef3ff;
      border-radius: 4px;
      color: #2459e0;

      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
    }
    div {
      font-weight: 700;
      font-size: 32px;
    }
  }

  button {
    position: absolute;
    right: 32px;
    font-weight: 500;
    font-size: 16px;
    color: #7a7a80;

    background: #f2f3f3;
    border: none;
    border-radius: 20px;
    width: 86px;
    height: 33px;
  }
`;

const MypageNav = styled.nav`
  margin-top: 112px;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1278px;
    height: 80px;
    background: #ffffff;
    border: 2px solid #f2f3f3;
    box-shadow: 0px 4px 24px rgba(184, 187, 192, 0.16);
    border-radius: 10px;
  }

  li {
    div {
      width: 426px;
      height: 80px;
      font-size: 26px;
      color: #7a7a80;
      font-weight: 700;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    a {
      &.active {
        font-weight: 700;

        div {
          background: #eef3ff;
          color: #2459e0;
        }
      }
    }
  }
`;
