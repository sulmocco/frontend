import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import Theme from './styles/Theme';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <Routes>
          
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
