import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import { Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      테스트할고얌123
      <ThemeProvider theme={Theme}>
        <Routes></Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
