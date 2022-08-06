import { ThemeProvider } from 'styled-components';
import Theme from './styles/Theme';
import { Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      hello world
      <ThemeProvider theme={Theme}>
        <Routes>
          
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
