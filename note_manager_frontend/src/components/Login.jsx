import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/user/isExist", {
        password,
        emailID,
      });

      if (response.status === 200 && response.data) {
        localStorage.setItem("password", password);
        localStorage.setItem("emailID", emailID);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "360px",
      margin: "40px auto",
      padding: "24px",
      borderRadius: "16px",
      backgroundColor: "#fafafa",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "16px",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
      outline: "none",
      transition: "border-color 0.2s ease",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#1976d2",
    },
    button: {
      width: "100%",
      padding: "14px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: isLoggingIn ? "#ccc" : "#1976d2",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "500",
      cursor: isLoggingIn ? "not-allowed" : "pointer",
      transition: "background-color 0.3s ease",
      outline: "none",
    },
    error: {
      color: "#d32f2f",
      fontSize: "14px",
      marginBottom: "10px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.formGroup}>
        <input
          type="text"
          placeholder="Email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>

      <button
        onClick={handleLogin}
        disabled={isLoggingIn}
        style={styles.button}
      >
        {isLoggingIn ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
