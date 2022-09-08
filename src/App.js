import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import Layout from "./components/common/Layout";
import Spinner from "./components/spinner";
import Bookmark from "./components/mypage/Bookmark";
import Friends from "./components/mypage/Friends";
import Mypost from "./components/mypage/Mypost";
import PasswordRedirect from "./components/passwordredirect";
import PasswordRending from "./components/passwordrending";
import PassWordInput from "./components/passwordreset";
import DeleteAccount from "./components/deleteaccountrending";
import sulmoggoApi from "./shared/apis";
import { userLogin, userLogout } from "./shared/modules";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const Home = React.lazy(() => import("./pages/home"));
const Auth = React.lazy(() => import("./pages/auth"));
const SignUp = React.lazy(() => import("./pages/signup"));
const Login = React.lazy(() => import("./pages/login"));
const Terms = React.lazy(() => import("./pages/terms"));
const Tables = React.lazy(() => import("./pages/tables"));
const LoginRending = React.lazy(() => import("./components/loginrending"));
const LoginRedirect = React.lazy(() => import("./pages/loginredirect"));
const ProfileEdit = React.lazy(() => import("./pages/profileedit"));
const Detail = React.lazy(() => import("./pages/detail"));
const Comment = React.lazy(() => import("./components/comment"));
const Chat = React.lazy(() => import("./pages/chat"));
const ResetPassword = React.lazy(() => import("./pages/resetpassword"));
const NewLive = React.lazy(() => import("./pages/newlive"));
const Mypage = React.lazy(() => import("./pages/mypage"));
const Post = React.lazy(() => import("./pages/post"));
const Rooms = React.lazy(() => import("./pages/rooms"));
const Live = React.lazy(() => import("./pages/live"));
const LiveRending = React.lazy(() => import("./pages/liverending"));
const EditPost = React.lazy(() => import("./pages/editpost"));

const ErrorFallback = (err) => {
  return (
    <>
      <Header/>
      <div className="errorPage">
        <img src="/images/img_deleterending.png" alt="crying"/>
        <h1>문제가 발생했습니다.</h1>
      </div>
      <Footer/>
    </>
  )
}
function App() {
  sulmoggoApi
    .getUser()
    .then((res) => {
      if (res.data.response) {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        userLogin({
          username: res.data.username,
          id: res.data.id,
          token,
          refreshToken,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      userLogout();
    });

  return (
    <Suspense fallback={<Spinner />}>
      <ThemeProvider theme={Theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/chat/:chatRoomId" element={<Chat />} />
          <Route path="/live" element={<Live />} />
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/oauth2/redirect" element={<LoginRedirect />} />
            <Route path="/oauth2/redirect_pw" element={<PasswordRedirect />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/loginrending" element={<LoginRending />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/post" element={<Post />} />
            <Route path="/editpost/:tableId" element={<EditPost />} />
            <Route path="/spinner" element={<Spinner />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/tables/:tableId" element={<Detail />} />
            <Route path="/live/new" element={<NewLive />} />
            <Route path="/render/live/:chatRoomId" element={<LiveRending />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/password" element={<PassWordInput />} />
            <Route path="/render/:params" element={<PasswordRending />} />
            <Route path="/render/deleteAccount" element={<DeleteAccount />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/mypage" element={<Mypage />}>
              <Route path="/mypage/bookmark" element={<Bookmark />} />
              <Route path="/mypage/mypost" element={<Mypost />} />
              <Route path="/mypage/friends" element={<Friends />} />
            </Route>
            <Route path="/mypage/edit" element={<ProfileEdit />} />
            <Route path="/loading" element={<Spinner />} />
          </Route>
        </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
