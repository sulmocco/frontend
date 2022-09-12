import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/spinner";
import sulmoggoApi from "../../shared/apis";
import { getLevel } from '../../shared/modules';
import { MypageNav, Profile, ProfileBox, Wrap } from './styles';

const Mypage = () => {
  const navigate = useNavigate();

  const { data, status } = useQuery(['user'], () => sulmoggoApi.getUserDetail().then(res => res.data), {
    cacheTime: 0,
  });

  // console.log(data)

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
            {data?.profileUrl === '' || null ? (
              <img src='/images/profile_default.svg' alt='기본이미지' />
            ) : (
              <img src={data?.profileUrl || '/images/profile_default.svg'} alt="프로필 이미지" />
            )}
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