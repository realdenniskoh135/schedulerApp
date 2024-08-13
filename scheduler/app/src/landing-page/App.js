import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import MySchedule from './pages/MySchedule';
import OneToOneCall from './pages/OneToOneCall';
import PriorityEmail from './pages/PriorityEmail';
import JoinCall from './pages/JoinCall';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/my-schedule" element={<MySchedule />} />
        <Route path="/1-to-1" element={<OneToOneCall />} />
        <Route path="/priority-email" element={<PriorityEmail />} />
        <Route path="/join" element={<JoinCall />} />
      </Routes>
    </Router>
  );
}

export default App;
