import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/pages/home/Home';
import QuickMatch from './components/pages/quickMatch/QuickMatch';
import Tournament from './components/pages/tournament/Tournament';
import About from './components/pages/about/About';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quick-match" element={<QuickMatch />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
