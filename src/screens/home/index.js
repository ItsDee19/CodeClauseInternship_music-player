import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Library from '../library';
import Feed from '../feed';
import Player from '../player';
import Liked from '../liked';
import './home.css';
import Sidebar from '../../components/sidebar';
import Login from '../auth/login';
import { setClientToken } from '../../spotify';

function getTokenFromHash(hash) {
  if (!hash) return null;
  const tokenParam = hash.split('&')[0].split('=')[1];
  return tokenParam;
}

function Home() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token');
    const hash = window.location.hash;
    window.location.hash = '';

    if (!storedToken && hash) {
      const newToken = getTokenFromHash(hash);
      window.localStorage.setItem('token', newToken);
      setToken(newToken);
      setClientToken(newToken);
    } else {
      setToken(storedToken);
      setClientToken(storedToken);
    }
  }, []);

  const handleSignOut = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className='main-body'>
        <Sidebar handleSignOut={handleSignOut} />
        <Routes>
          <Route path='/' element={<Library />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/player' element={<Player />} />
          <Route path='/liked' element={<Liked />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
