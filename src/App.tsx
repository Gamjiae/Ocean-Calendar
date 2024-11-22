import MainPage from './pages/MainPage';
import TempPage from './pages/TempPage';
import TidePage from './pages/TidePage';
import WavePage from './pages/WavePage';
import WeatherPage from './pages/WeatherPage';

import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/temp" element={<TempPage />} />
        <Route path="/tide" element={<TidePage />} />
        <Route path="/wave" element={<WavePage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;