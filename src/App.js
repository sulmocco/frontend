import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import LoginRending from "./pages/loginrending";
import Login from "./pages/login";
import Terms from "./pages/terms";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/loginrending" element={<LoginRending />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
