import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Organizer/Dashboard"
import EventForm from "./components/EventForm"; 
import BrowseEvents from "./components/BrowseEvents";
function App() {
  return (
    <Router>
      <Routes>
     
        <Route path="/" element={<Dashboard />} />
        <Route path="/eventform" element={<EventForm />} />
          <Route path="/browseevents" element={<BrowseEvents/>} />
      </Routes>
    </Router>
  );
}

export default App;
