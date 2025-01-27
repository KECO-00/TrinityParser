import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import GradePage from './pages/GradePage';
import SugangPage from './pages/SugangPage';
import BoardPage from './pages/BoardPage';
import Navbar from './components/Navbar';
import {Footer} from './components/Footer';
import './styles/App.css';
import { useState, useEffect } from 'react';
import PrivacyPolicy from './pages/PrivacyPolicyPage';

interface authorizeResonse {
  status: string;
  message: string;
  data: null;
};

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const api_url = import.meta.env.VITE_API_URL;

  const checkLoggedIn = async () => {
    try {
        const res = await fetch(`${api_url}/trinity/auth/authorize`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const data: authorizeResonse = await res.json();
        if(data.status === "OK") {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
    } catch (err) {
        console.error("Error get login info", err);
    }
}
  useEffect(() => {
    checkLoggedIn();
  })

  return (
    <BrowserRouter>
      <div className="header">
        <Link to={"/"} className="header-link">TrinityParser</Link>
      </div>
      <div className="container">
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}  />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="/sugang" element={isLoggedIn ? <SugangPage setLoggedIn={setLoggedIn} /> : <LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="/grade" element={isLoggedIn ? <GradePage setLoggedIn={setLoggedIn} /> : <LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="board" element={ isLoggedIn ? <BoardPage setLoggedIn={setLoggedIn} /> : <LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
          <Footer />
      </div>
      <Navbar/>
    </BrowserRouter>
  )
}

export default App
