import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Wrap>
      <Navbar>
        <NavLeft>
          <ul>
            <li>
              <Link to="/">술모꼬</Link>
            </li>
            <li>술약속</li>
            <li><Link to="/tables">술상추천</Link></li>
          </ul>
        </NavLeft>
        <NavRight>
          <ul>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/terms">회원가입</Link>
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
  a {
    &:link,
    &:visited,
    &:hover,
    &:active {
      color: ${(props) => props.theme.black};
    }
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
    font-size: 16px;
    gap: 48px;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  ul {
    display: flex;
    font-size: 16px;
    gap: 48px;
  }
`;
