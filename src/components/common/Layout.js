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
    location.pathname.startsWith("/");
  console.log(isShow);
  return (
    <>
      <Header />
      <Main show={isShow} loc={location.pathname}>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;

const Main = styled.main`
  max-width: ${(props) => (props.show ? "100%" : "1200px")};
  margin: 0 auto;
  ${(props) =>
    props.show
      ? css``
      : css`
          padding: 72px 5px 30px;
        `}
  padding-top: ${(props) =>
    props.loc.startsWith("/signup") ? "none" : "72px"};
`;
