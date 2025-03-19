import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailID, setEmailID] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !emailID) {
      setError("Please provide username, email, and password");
      return;
    }

    setIsRegistering(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/user/save", {
        name: username,
        password,
        emailID,
      });

      if (response.status === 200) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("emailID", emailID);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Register error:", error);
    } finally {
      setIsRegistering(false);
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
      backgroundColor: isRegistering ? "#ccc" : "#1976d2",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "500",
      cursor: isRegistering ? "not-allowed" : "pointer",
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
      <h2 style={styles.heading}>Register</h2>
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.formGroup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <input
          type="email"
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
        onClick={handleSubmit}
        disabled={isRegistering}
        style={styles.button}
      >
        {isRegistering ? "Registering..." : "Register"}
      </button>
    </div>
  );
}

export default Register;
