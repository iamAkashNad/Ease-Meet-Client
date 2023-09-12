import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppState from "./context/AppState";

import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import Landing from "./components/Landing";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <AppState>
        <Navbar />
        <div style={{ marginTop: "3.5rem", height: "2rem" }}>
          <Alert />
        </div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AppState>
    </Router>
  );
}

export default App;
