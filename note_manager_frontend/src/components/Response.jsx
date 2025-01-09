import axios from "axios";
import { useState } from 'react'

function Response() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = () => {
    axios
      .post("http://localhost:8080/api/echo", { message })
      .then((res) => setResponse(res.data.message))
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React-Spring Boot Echo App</h1>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {response && (
        <div style={{ marginTop: "20px" }}>
          <h2>Response from Backend:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}


export default Response