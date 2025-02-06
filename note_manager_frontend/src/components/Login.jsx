import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('http://localhost:8080/user/isExist', { password, emailID
    }).then((response) => {
        if (response.status === 200 && response.data) {
            console.log(response);
            localStorage.setItem('password', password);
            localStorage.setItem('emailID', emailID);
            setIsLoggedIn(true);
            navigate('/');
        }
    }).catch((error) => {
        console.error("Login error:", error);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="email"
        value={emailID}
        onChange={(e) => setEmailID(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
