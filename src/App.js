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
import Mypage from "./pages/mypage";
import Bookmark from "./components/mypage/Bookmark";
import Friends from "./components/mypage/Friends";
import Mypost from "./components/mypage/Mypost";
import NewLive from "./pages/newlive";
import ResetPassword from "./pages/resetpassword";
import Chat from "./pages/chat";
import Rooms from "./pages/rooms";

const Home = React.lazy(() => import("./pages/Home"));
const Auth = React.lazy(() => import("./pages/auth"));
const SignUp = React.lazy(() => import("./pages/signup"));
const Login = React.lazy(() => import("./pages/login"));
const Terms = React.lazy(() => import("./pages/terms"));
const Tables = React.lazy(() => import("./pages/tables"));
const LoginRending = React.lazy(() => import("./pages/loginrending"));
const LoginRedirect = React.lazy(() => import("./components/LoginRedirect"));
const ProfileEdit = React.lazy(() => import("./pages/profileedit"));
const Detail = React.lazy(() => import("./pages/detail"));
const Comment = React.lazy(() => import("./components/comment"));

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const refreshLogin = useCallback(() => {
    if (localStorage.getItem("token")) {
      // TODO: 토큰으로 로그인 정보 가져오는 api 필요할 것 같습니다.
      dispatch(
        userActions.userLogin({
          username: localStorage.getItem("username"),
          token: localStorage.getItem("token"),
        })
      );
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
            <Route path="/post/:tableId" element={<Post />} />
            <Route path="/spinner" element={<Spinner />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/tables/:tableId" element={<Detail />} />
            <Route path="/profile" element={<ProfileEdit />} />
            <Route path="/live/new" element={<NewLive />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/chat/:roomId" element={<Chat />} />
            <Route path="/rooms" element={<Rooms />}/>
            <Route path="/mypage" element={<Mypage />}>
              <Route path="/mypage/bookmark" element={<Bookmark />} />
              <Route path="/mypage/mypost" element={<Mypost />} />
              <Route path="/mypage/friends" element={<Friends />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
