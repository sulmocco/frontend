import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/common/Layout";
import LoginRedirect from "./components/LoginRedirect";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/oauth2/redirect" element={<LoginRedirect />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
