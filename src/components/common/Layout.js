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
    location.pathname === "/";
  const grayBg = location.pathname.startsWith("/tables")

  console.log(isShow);
  return (
    <>
      <Header location={location}/>
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
  background-color: ${props => props.bg ? props.theme.bg_light_gray : "transparent"};
`

const Main = styled.main`
  max-width: ${(props) => (props.show ? "100%" : "1290px")};
  margin: 0 auto;
  ${(props) =>
    props.show
      ? css``
      : css`
          padding: 11.2rem 5px 30px;
        `}
  padding-top: ${(props) =>
    props.loc.startsWith("/signup") ? "none" : "11.2rem"};
`;
