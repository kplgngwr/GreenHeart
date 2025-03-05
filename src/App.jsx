import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Aboutus from './pages/Aboutus';
import './App.css';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Market from './pages/Market';
import Dashboard from './pages/Dashboard';
import Services from './pages/Service';
import Education from './pages/Education';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/services" element={<Services />} />
          <Route path="/education" element={<Education />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
