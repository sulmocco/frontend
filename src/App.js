import React, { useCallback, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import { Suspense } from "react";
import Spinner from "./components/spinner";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./redux/userSlice";
import Post from "./pages/post";

const Home = React.lazy(() => import("./pages/Home"));
const Auth = React.lazy(() => import("./pages/Auth"));
const SignUp = React.lazy(() => import("./pages/signup"));
const Login = React.lazy(() => import("./pages/login"));
const Terms = React.lazy(() => import("./pages/terms"));
const LoginRending = React.lazy(() => import("./pages/loginrending"));
const LoginRedirect = React.lazy(() => import("./components/LoginRedirect"));

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const refreshLogin = useCallback(() => {
    if (localStorage.getItem("token")) {
      // 토큰으로 로그인 정보 가져오는 api 필요할 것 같습니다.
      dispatch(userActions.userLogin());
    }
  }, [dispatch]);
  useEffect(() => {
    refreshLogin();
  }, [isLogin, refreshLogin]);
  return (
    <Suspense fallback={<Spinner />}>
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/oauth2/redirect" element={<LoginRedirect />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/loginrending" element={<LoginRending />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/post" element={<Post />} />
            <Route path="/spinner" element={<Spinner />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
