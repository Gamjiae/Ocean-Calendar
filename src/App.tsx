import Header from './components/Header';
import Main from './pages/MainPage';
import TempPage from './pages/TempPage';
import TidePage from './pages/TidePage';
import WavePage from './pages/WavePage';
import WeatherPage from './pages/WeatherPage';

import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="/temp" element={<TempPage />} />
      <Route path="/tide" element={<TidePage />} />
      <Route path="/wave" element={<WavePage />} />
    </Routes>
  );
}

export default App;