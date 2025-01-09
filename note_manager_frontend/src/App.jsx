import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Response from "./components/Response";
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/response" element={<Response />} />
        <Route path="/profile/:name" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
