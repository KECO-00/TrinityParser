import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import GradePage from './pages/GradePage';
import SugangPage from './pages/SugangPage';
import Navbar from './components/Navbar';
import {Footer} from './components/Footer';
import './styles/App.css';
import { useState } from 'react';
import PrivacyPolicy from './pages/PrivacyPolicyPage';



function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className="header">
        <span>Trinity Parser</span>
      </div>
      <div className="container">
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}  />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="/sugang" element={isLoggedIn ? <SugangPage setLoggedIn={setLoggedIn} /> : <LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="/grade" element={isLoggedIn ? <GradePage setLoggedIn={setLoggedIn} /> : <LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
          <Footer />
      </div>
      <Navbar/>
    </BrowserRouter>
  )
}

export default App
