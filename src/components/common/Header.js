import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { SignOutSelector } from "../../recoil/userdata";
// import { userLogout } from "../../shared/modules";

const Header = ({ location }) => {
  const Token = localStorage.getItem("token");
  const [,setSignOut] = useRecoilState(SignOutSelector)
  return (
    <Wrap>
      <Navbar>
        <NavLeft>
          <ul>
            <li>
              <NavLink
                to="/"
                active={location?.pathname.startsWith("/asd") || ""}
              >
                <img src="/images/logo.svg" alt="술모꼬 로고" />
              </NavLink>
            </li>
            {Token ? (
              <>
                <li>
                  <NavLink
                    to="/rooms"
                    active={location?.pathname.startsWith("/rooms") || ""}
                  >
                    술약속
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tables"
                    active={location?.pathname.startsWith("/tables") || ""}
                  >
                    술상추천
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </NavLeft>
        {Token ? (
          <NavRight>
            <ul>
              <li>
                <NavLive to="/live/new">술약속 잡기</NavLive>
              </li>
              <li>
                <NavLink to="/mypage/bookmark">마이페이지</NavLink>
              </li>
              <li>
                <div
                  className="logout"
                  onClick={() => {
                    setSignOut();
                    window.location.href = "/";
                  }}
                >
                  로그아웃
                </div>
              </li>
            </ul>
          </NavRight>
        ) : (
          <NavRight>
            <ul>
              <li>
                <NavLink
                  to="/login"
                  active={location?.pathname.startsWith("/login") || ""}
                >
                  로그인
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms">회원가입</NavLink>
              </li>
            </ul>
          </NavRight>
        )}
      </Navbar>
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #f2f2f2;
  z-index: 100;
  color: ${(props) => props.theme.black} !important;
  background-color: ${(props) => props.theme.white};
  box-shadow: ${(props) => props.theme.shadow_gray};
  font-weight: 500;
  img {
    width: 14.403rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: 0 2rem;
    img{
      width: 7.8rem;
    }
    .logout{
      font-size: 1.2rem;
      line-height: 1.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  max-width: 1280px;
  height: ${props => props.theme.headerSize};
  margin: 0 auto;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    height: ${props => props.theme.headerSizeMobile};
  }
  li{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  ul {
    display: flex;
    align-items: center;
    font-size: 2rem;
    gap: 8rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    ul{
      gap: 1rem;
    }
  }
`;

const NavLink = styled(Link)`
  color: ${(props) =>
    props.active ? props.theme.primary : props.theme.black} !important;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        font-size: 1.2rem;
        line-height: 1.4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  /* margin-left: auto; */
  ul {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    line-height: 1.9rem;
    gap: 2.2rem;
    letter-spacing: -0.04em;

    li div {
      cursor: pointer;
      
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    ul{
      gap: 1rem;
    }
  }
`;

const NavLive = styled(Link)`
  padding: 0.4rem 1.2rem;
  background-color: ${(props) => props.theme.bg_light_blue};
  font-size: 1.6rem;
  line-height: 1.9rem;
  border-radius: 0.4rem;
  color: ${(props) => props.theme.primary} !important;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      font-size: 1.2rem;
      line-height: 1.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
  }
`;
