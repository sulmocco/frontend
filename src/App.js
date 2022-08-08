import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import { Route, Routes } from "react-router-dom";
import LoginRending from "./pages/loginrending";

function App() {
  return (
    <div className="App">
      테스트할고얌123
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route path="/loginrending" element={<LoginRending />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
