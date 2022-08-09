import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Wrap>
      <Navbar>
        <NavLeft>
          <ul>
            <li><Link to="/">술모꼬</Link></li>
            <li>술약속</li>
            <li>술상추천</li>
          </ul>
        </NavLeft>
        <NavRight>
          <ul>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/signup">회원가입</Link></li>
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
  color: white !important;
  background-color: ${props => props.theme.primary};
  a{
    &:link, &:visited, &:hover, &:active{
      color: white;
    }
  }
`;

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 72px;
  margin: 0 auto;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  ul {
    display: flex;
    font-size: 18px;
    gap: 48px;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  ul {
    display: flex;
    font-size: 18px;
    gap: 48px;
  }
`;
