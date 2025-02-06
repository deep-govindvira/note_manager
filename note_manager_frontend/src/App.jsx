import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Response from "./components/Response";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import Note from "./components/Note";
import New from "./components/New";
import NoteID from "./components/NoteID";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("emailID")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/note' element={isLoggedIn ? <Note/> : <Navigate to="/login" />} />
        <Route path='/new' element={isLoggedIn ? <New/> : <Navigate to="/login" />} />
        <Route path="/:noteId" element={isLoggedIn ? <NoteID/> : <Navigate to="/login" />}  />
        <Route path="/about" element={<About />} />
        <Route path="/response" element={<Response />} />
        <Route path="/profile/:name" element={<Profile />} />
        <Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
