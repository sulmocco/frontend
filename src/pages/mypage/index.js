import React from "react";
import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";

const index = () => {
  return (
    <div>
      <Profile>
        <div className="img"></div>
        <div className="nickname">닉네임</div>
        <button>수정하기</button>
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
    </div>
  );
};

export default index;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  .img {
    width: 182px;
    height: 182px;
    border-radius: 50%;
    background: #d9d9d9;
  }

  .nickname {
    font-size: 36px;
    margin-top: 50px;
  }

  button {
    margin-top: 50px;
    width: 158px;
    height: 62px;
    border: none;
    font-weight: 700;
    font-size: 2rem;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.white};
  }
`;

const MypageNav = styled.nav`
  margin-top: 100px;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  li {
    div {
      width: 400px;
      height: 70px;
      background: #d9d9d9;
      font-size: 36px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    a {
      &.active {
        font-weight: 700;
      }
    }
  }
`;
