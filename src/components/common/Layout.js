import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  const isShow =
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/loginrending") ||
    location.pathname.startsWith("/terms") ||
    location.pathname.startsWith("/auth") ||
    location.pathname.startsWith("/resetPassword") ||
    location.pathname.startsWith("/password") ||
    location.pathname.startsWith("/mypage") ||
    location.pathname.startsWith("/rooms") ||
    location.pathname.startsWith("/render") ||
    location.pathname.startsWith("/tables") ||
    location.pathname === "/";
  const grayBg =
    location.pathname === "/tables" || location.pathname.startsWith("/tables?");

  // console.log(isShow);
  return (
    <>
      <Header location={location} />
      <Background bg={grayBg}>
        <Main show={isShow} loc={location.pathname}>
          <Outlet />
        </Main>
      </Background>
      <Footer />
    </>
  );
};

export default Layout;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.bg ? props.theme.bg_light_gray : "transparent"};
`;

const Main = styled.main`
  max-width: ${(props) => (props.show ? "100%" : "1290px")};
  margin: 0 auto;
  padding: ${props => props.theme.headerSize} 5px 30px;
  padding-top: ${(props) =>
    props.loc.startsWith("/signup") ? "none" : props.theme.headerSize};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: ${props => props.theme.headerSizeMobile} 5px 30px;
    padding-top: ${(props) =>
    props.loc.startsWith("/signup") ? "none" : props.theme.headerSizeMobile};
  }
`;

