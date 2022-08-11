import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import { Suspense } from "react";
import Spinner from "./components/spinner";

const Home = React.lazy(() => import("./pages/Home"));
const Auth = React.lazy(() => import("./pages/Auth"));
const SignUp = React.lazy(() => import("./pages/signup"));
const Login = React.lazy(() => import("./pages/login"));
const Terms = React.lazy(() => import("./pages/terms"));
const LoginRending = React.lazy(() => import("./pages/loginrending"));
const LoginRedirect = React.lazy(() => import("./components/LoginRedirect"));

function App() {
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
            <Route path="/spinner" element={<Spinner />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
