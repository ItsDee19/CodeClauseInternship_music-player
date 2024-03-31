import React from 'react';
import './login.css'; 

const clientID = "ade8299f6f084c1e9b1d5f8d5bdb283d";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-library-read", "playlist-read-private"];

const Login = () => {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  
  const handleLogin = () => {
    const loginEndpoint = `${authEndpoint}?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token&show_dialog=true`;
    window.location.href = loginEndpoint;
  };

  return (
    <div className="login-page"> 
      <h1>Login Page</h1>
      <button className="login-btn" onClick={handleLogin}>Login with Spotify</button> 
    </div>
  );
};

export default Login;



