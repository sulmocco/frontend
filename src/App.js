import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import { Route, Routes } from "react-router-dom";
import LoginRending from "./pages/loginrending";
import Login from "./pages/login";
import Terms from "./pages/terms";

function App() {
  return (
    <div className="App">
      테스트할고얌123
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route path="/loginrending" element={<LoginRending />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
