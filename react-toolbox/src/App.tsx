import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HolidayPage from './pages/HolidayPage';
import WorkCountdownPage from './pages/WorkCountdownPage';
import UuidGeneratorPage from './pages/UuidGeneratorPage';
import TimestampPage from './pages/TimestampPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/holiday" element={<HolidayPage />} />
          <Route path="/work" element={<WorkCountdownPage />} />
          <Route path="/uuid-generator" element={<UuidGeneratorPage />} />
          <Route path="/time" element={<TimestampPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;