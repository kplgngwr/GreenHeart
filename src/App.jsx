import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Aboutus from './pages/Aboutus';
import './App.css';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Market from './pages/Market';
import Dashboard from './pages/Dashboard';
import Services from './pages/Service';
import Education from './pages/Education';
import SignUpPage from './pages/auth/SignUpPage';
import SignInPage from './pages/auth/SignInPage';
import Resource from './pages/Resource';
import Reasearch from './pages/Reasearch';
import GIS from './pages/GIS';
import Report from './Components/Report';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
