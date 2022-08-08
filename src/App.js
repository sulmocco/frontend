import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
