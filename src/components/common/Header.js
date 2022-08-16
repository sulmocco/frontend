import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = ({location}) => {
  return (
    <Wrap>
      <Navbar>
        <NavLeft>
          <ul>
            <li>
              <NavLink to="/" active={location?.pathname.startsWith("/asd")}>
                <img src="/images/logo.svg"/>
              </NavLink>
            </li>
            <li>술약속</li>
            <li><NavLink to="/tables" active={location?.pathname.startsWith("/tables")}>술상추천</NavLink></li>
          </ul>
        </NavLeft>
        <NavRight>
          <ul>
          <li>
              <NavLive to="/live">방송하기</NavLive>
            </li>
            <li>
              <NavLink to="/login" active={location?.pathname.startsWith("/login")}>로그인</NavLink>
            </li>
            <li>
              <NavLink to="/terms">회원가입</NavLink>
            </li>
          </ul>
        </NavRight>
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
  img{
    width: 14.403rem;
  }
`;

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  max-width: 1280px;
  height: 11.2rem;
  margin: 0 auto;
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
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? props.theme.primary : props.theme.black} !important;
`

const NavRight = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  ul {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    line-height: 1.9rem;
    gap: 2.2rem;
letter-spacing: -0.04em;
  }
`;

const NavLive = styled(Link)`
padding: .4rem 1.2rem;
background-color: ${props => props.theme.bg_light_blue};
font-size: 1.6rem;
line-height: 1.9rem;
border-radius: .4rem;
color: ${props => props.theme.primary} !important;
`
